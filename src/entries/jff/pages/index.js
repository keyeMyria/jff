import React from "react";
import 'JFF/assets/main.less';
import {homeStore} from "JFF/store";
import Home from './Home';
import {getUser} from 'JFF/utils/JffStorage';
import {Redirect} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject('authStore')
@observer
export default class extends React.Component {

    render() {
        const {isAuth} = this.props.authStore;
        return isAuth ?
            <Home {...this.props} homeStore={homeStore}/> :
            <Redirect to={{pathname: '/jff/login', state: {from: this.props.location}}}/>;
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

