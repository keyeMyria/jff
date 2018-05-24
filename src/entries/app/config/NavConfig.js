export const NAV_LIST = [
    {
        id: '11000',
        name: '首页',
        role: ['角色1'],
        path: '/app/overview',
        iconType: 'pie-chart',
        redirect: false
    }, {
        id: '12000',
        name: '编辑页面',
        role: ['角色1'],
        path: '/app/pageEdit',
        iconType: 'pie-chart'
    },
    {
        id: '13000',
        name: '测试页',
        role: ['角色1'],
        path: '/app/page',
        iconType: 'desktop',
        sub: [
            {
                id: '13100',
                name: '页面B',
                role: ['角色1'],
                iconType: 'file',
                path: '/app/pageB',
                sub: []
            },
            {
                id: '13200',
                name: '页面C',
                role: ['角色1'],
                iconType: 'book',
                path: '/app/pageC',
                sub: []
            },
            {
                id: '13300',
                name: 'NoRouteToDefault',
                role: ['角色1'],
                iconType: 'tablet',
                path: '/app/order-manage/labor',
                sub: []
            }
        ]
    },
    {
        id: '14000',
        name: '页面A',
        role: ['角色1'],
        path: '/app/pageA',
        iconType: 'edit',
        sub: []
    }, {
        id: '15000',
        name: 'NoTab',
        role: ['角色1'],
        iconType: 'appstore',
        path: '/app/404',
        sub: []
    }
];
export const INIT_NAV = NAV_LIST[0];