import {observable, action, autorun, toJS} from "mobx";
import {INIT_NAV} from '../config/NavConfig';
import {BaseViewStore} from "./BaseViewStore";

export default class {

    constructor(history, store) {
        this.history = history;
        this.store = store;
    }

    @observable tabList = new Map();
    @observable tabActiveKey = '';
    @observable navOpenKeys = [];
    @observable navCollapsed = false;

    @action
    tabSave = (tabItem) => {
        if (tabItem.tabKey) {
            this.switchTabStoreView(tabItem);
            this.tabList.set(tabItem.tabKey, tabItem);
            this.tabActiveKey = tabItem.tabKey;
        }
    };

    @action
    handleTabEdit = (targetKey, action) => {
        if (action === 'remove') {
            if (targetKey) {
                if (this.tabActiveKey === targetKey) { // 关闭当前
                    let length = this.tabList.size;
                    if (length > 1 || (INIT_NAV && INIT_NAV.path && targetKey !== INIT_NAV.path)) {
                        this.onTabCloseStoreChange(targetKey);
                        this.tabList.delete(targetKey);
                        let previousKey = length > 1 ? [...this.tabList.keys()][length - 2] : INIT_NAV.path;
                        this.history.push(previousKey);
                        this.tabActiveKey = previousKey;
                    }
                } else { // 关闭其它
                    this.onTabCloseStoreChange(targetKey);
                    this.tabList.delete(targetKey);
                }
            }
        }
    };

    @action
    handleTabPageChange = (tabKey) => {
        if (this.tabActiveKey !== tabKey) {
            this.history.push(tabKey);
        }
    };

    @action
    handleNavOpenChange = (navOpenKeys) => {
        this.navOpenKeys = navOpenKeys;
    };

    @action
    handleNavToggle = () => {
        this.navCollapsed = !this.navCollapsed;
    };

    // 修复当nav从展开到收起状态时，如果存在选中的navMenu，则会悬浮在外侧
    nav = autorun(() => {
        if (this.navCollapsed) {
            this.navOpenKeys = [];
        }
    });

    switchTabStoreView = (newTabItem) => {
        if (newTabItem) {
            let stores = newTabItem.stores;
            if (stores && stores instanceof Array && stores.length) {
                for (let storeName of stores) {
                    let store = this.store[storeName];
                    if (store && store instanceof BaseViewStore) {
                        store.switchView(newTabItem.tabKey);
                    }
                }
            }
        }
    };

    onTabCloseStoreChange = (targetKey) => {
        if (targetKey) {
            let targetTabItem = this.tabList.get(targetKey);
            if (targetTabItem) {
                let stores = toJS(targetTabItem.stores);
                if (stores && stores instanceof Array && stores.length) {
                    for (let storeName of stores) {
                        let store = this.store[storeName];
                        if (store && store instanceof BaseViewStore) {
                            store.resetStoreView(targetKey, true);
                        }
                    }
                }
            }
        }
    };
}