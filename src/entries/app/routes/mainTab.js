import React from 'react';
import {tabWrap} from '../pages';
import Loadable from "react-loadable";
import LazyLoadComponent from 'COMPONENTS/lazyLoad';

const OverView = Loadable({
    loader: () => import('../pages/overView'),
    loading: LazyLoadComponent
});
const PageEdit = Loadable({
    loader: () => import('../pages/pageEdit'),
    loading: LazyLoadComponent
});
const PageA = Loadable({
    loader: () => import('../pages/pageA'),
    loading: LazyLoadComponent
});
const PageAChild = Loadable({
    loader: () => import('../pages/pageA/PageAChild'),
    loading: LazyLoadComponent
});
const PageB = Loadable({
    loader: () => import('../pages/pageB'),
    loading: LazyLoadComponent
});
const PageC = Loadable({
    loader: () => import('../pages/pageC'),
    loading: LazyLoadComponent
});

export default {
    path: '/app',
    children: [
        {
            path: '/app/overview',
            component: OverView,
            exact: true
        },
        {
            path: '/app/pageEdit',
            component: PageEdit,
            exact: true
        },
        {
            path: '/app/pageA',
            component: PageA,
            exact: true
        },
        {
            path: '/app/pageA/:xxId',
            component: PageAChild,
            exact: true
        },
        {
            path: '/app/pageB',
            component: PageB
        },
        {
            path: '/app/pageC',
            component: PageC
        }
    ]
};

