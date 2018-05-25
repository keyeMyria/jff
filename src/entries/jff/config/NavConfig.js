export const NAV_LIST = [
    {
        id: '11000',
        name: '首页',
        role: ['角色1'],
        path: '/jff/overview',
        iconType: 'pie-chart',
        redirect: false
    }, {
        id: '12000',
        name: '编辑页面',
        role: ['角色1'],
        path: '/jff/pageEdit',
        iconType: 'pie-chart'
    },
    {
        id: '13000',
        name: '测试页',
        role: ['角色1'],
        path: '/jff/page',
        iconType: 'desktop',
        sub: [
            {
                id: '13100',
                name: '页面B',
                role: ['角色1'],
                iconType: 'file',
                path: '/jff/pageB',
                sub: []
            },
            {
                id: '13200',
                name: '页面C',
                role: ['角色1'],
                iconType: 'book',
                path: '/jff/pageC',
                sub: []
            },
            {
                id: '13300',
                name: 'NoRouteToDefault',
                role: ['角色1'],
                iconType: 'tablet',
                path: '/jff/order-manage/labor',
                sub: []
            }
        ]
    },
    {
        id: '14000',
        name: '多编辑页',
        role: ['角色1'],
        path: '/jff/pageA',
        iconType: 'edit',
        sub: []
    }, {
        id: '15000',
        name: 'NoTab',
        role: ['角色1'],
        iconType: 'appstore',
        path: '/jff/404',
        sub: []
    }
];
export const INIT_NAV = NAV_LIST[0];