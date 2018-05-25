import React from 'react';
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

const path = '/jff';

export default {
    path,
    children: [
        {
            path: `${path}/overview`,
            component: OverView
        },
        {
            path: `${path}/pageEdit`,
            component: PageEdit
        },
        {
            path: `${path}/pageA`,
            component: PageA
        },
        {
            path: `${path}/pageA/:xxId`,
            component: PageAChild
        },
        {
            path: `${path}/pageB`,
            component: PageB
        },
        {
            path: `${path}/pageC`,
            component: PageC
        }
    ]
};

