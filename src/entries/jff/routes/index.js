import React from 'react';
import Loadable from "react-loadable";
import LazyLoadComponent from 'COMPONENTS/lazyLoad';
import NotFound from 'COMPONENTS/notFound';

const App = Loadable({
    loader: () => import('../pages'),
    loading: LazyLoadComponent
});

const Login = Loadable({
    loader: () => import('../pages/login'),
    loading: LazyLoadComponent
});
const path = '/jff';

export default {
    path,
    redirect: `${path}/404`,
    children: [
        {
            path: `${path}/login`,
            component: Login
        },
        {
            path: `${path}/404`,
            component: NotFound
        },
        {
            path: `${path}`,
            component: App
        }
    ]
};