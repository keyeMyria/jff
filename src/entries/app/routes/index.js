import React from 'react';
import Loadable from "react-loadable";
import LazyLoadComponent from 'COMPONENTS/lazyLoad';

const App = Loadable({
    loader: () => import('../pages'),
    loading: LazyLoadComponent
});

export default {
    path: '/app',
    redirect: '/app/404',
    children: [
        {
            path: '/app/login',
            component: () => <div>LOGIN</div>
        },
        {
            path: '/app',
            component: App,
            exact: true
        }
    ]
};