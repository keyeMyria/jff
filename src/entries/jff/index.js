import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import history from './routes/history';
import Loadable from "react-loadable";
import LazyLoadComponent from 'COMPONENTS/lazyLoad';
import NotFound from 'COMPONENTS/notFound';
import zhCN from "antd/lib/locale-provider/zh_CN";
import {Provider} from 'mobx-react';
import {LocaleProvider} from 'antd';
import store, {homeStore, authStore} from "JFF/store";
import 'JFF/assets/less/framework.less';

const path = '/jff';

const Login = Loadable({
    loader: () => import('./pages/login'),
    loading: LazyLoadComponent
});

const JFF = Loadable({
    loader: () => import('./pages'),
    loading: LazyLoadComponent
});

ReactDOM.render((
    <LocaleProvider locale={zhCN}>
        <Provider {...store}>
            <Router history={history}>
                <Switch>
                    <Route path={`${path}/login`} component={Login}/>
                    <Route path={`${path}/404`} component={NotFound}/>
                    <Route path={`${path}`} component={JFF}/>
                    <Redirect to={`${path}/404`}/>
                </Switch>
            </Router>
        </Provider>
    </LocaleProvider>
), document.getElementById('app'));
