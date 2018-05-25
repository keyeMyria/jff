module.exports = [{
    path: '/OP_ECM_Manager/OP_ECM_GetBrokerInfo',
    method: 'post',
    response: (req, res) => ({
        Data: {
            "RecordList|10": [{
                'EmployeeID|+1': 1,
                name: '@cname',
                'age|': 0,
                RegTime: '@datetime("yyyy-MM-dd hh:mm:ss")',
                IDNum: "8548",
                LoginName: "huanjie",
                Name: "焕姐",
                'Status|1-3': 0,
                UserName: "何程傲"
            }]
        },
        Code: 0,
        Desc: '成功'
    })
}
];