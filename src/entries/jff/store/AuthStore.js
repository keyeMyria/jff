import {observable, action, computed} from "mobx";
import {BaseView, BaseViewStore} from "JFF/store/BaseViewStore";
import {localStorage} from "JFF/utils/JffStorage";

export class View extends BaseView {
    @observable loginFormInfo = {};
}

export default class extends BaseViewStore {
    @observable authInfo = {};

    constructor(ViewPattern) {
        super(ViewPattern);
        try {
            this.authInfo = JSON.parse(localStorage.getItem('user'));
        } catch (ignore) {
            localStorage.putItem('user', JSON.stringify({}));
        }
    }

    @action
    onFormChange = (changedValues, allValues) => {
        this.view.loginFormInfo = allValues || {};
    };

    @action
    handleLogin = () => {
        let {phone, pwd} = this.view.loginFormInfo;
        let authInfo = {token: phone + pwd};
        try {
            localStorage.putItem('user', JSON.stringify(authInfo));
            this.authInfo = authInfo;
        } catch (e) {
            console.error(e);
            this.view.loginFormInfo = {};
            this.authInfo = {};
        }
    };

    @computed
    get isAuth() {
        return !!(this.authInfo && this.authInfo.token);
    }

    @computed
    get loginEnable() {
        let {phone, pwd} = this.view.loginFormInfo;
        return phone && pwd;
    }

    @computed
    get sendCodeEnable() {
        let {phone} = this.view.loginFormInfo;
        return phone;
    }
}