import React from "react";
import '../assets/main.less';
import store, {homeStore} from "../store";
import {Provider} from 'mobx-react';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Home from './Home';

export default class extends React.PureComponent {
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <Provider {...store}>
                    <Home {...this.props} homeStore={homeStore}/>
                </Provider>
            </LocaleProvider>
        );
    }
}

// 可以通过decorators或者func
export function tabWrap(tabParam) {

    function WrappedComponent(component, param) {
        if (!component.prototype || !component.prototype.isReactComponent) return;
        return class extends React.Component {
            tabSave = homeStore.tabSave;
            tabRemove = homeStore.tabRemove;

            constructor(props) {
                super(props);
                this.addTab(props, this.getKey(props.location));
            }

            componentWillReceiveProps(nextProps) {
                let tabKey = this.getKey(nextProps.location);
                if (tabKey !== this.tabKey) {
                    this.addTab(nextProps, tabKey);
                }
            }

            componentWillUnmount() {
                // console.log('tabWrap unmount', this.tabKey);
            }

            render = () => React.createElement(component, this.props);

            getKey = (location) => location.pathname + location.search; // todo fix deadCode

            addTab = (props, tabKey) => {
                if (!tabKey) return;
                let paramT = typeof param;
                let tabName;
                let tabItem = {};
                switch (paramT) {
                    case 'string':
                        tabName = param;
                        break;
                    case 'object':
                        let tName = param.tabName;
                        if (typeof tName === 'string') {
                            tabName = tName;
                        } else if (typeof tName === 'function') {
                            tabName = tName(props);
                        }
                        tabItem = {...param};
                        break;
                    case 'function':
                        tabName = param(props);
                        break;
                    default:
                        throw new Error('tabWrap first param can only be a string/object/function');
                }
                this.tabKey = tabKey;
                if (!tabName) throw new Error('tabWrap first param can only be a string/object/function that specifies a tabName');
                delete tabItem.tabName;
                // delete tabItem.tabId;
                this.tabSave({tabKey, tabName, ...tabItem});
            };
        };
    }

    if (tabParam.prototype && tabParam.prototype.isReactComponent) {
        return WrappedComponent(tabParam);
    }
    return (component) => WrappedComponent(component, tabParam);
}

