import React from 'react';
import {Table, Input, Button, Tabs, Badge} from 'antd';
import {inject, observer} from "mobx-react";
import {tabWrap} from '../';

/**
 * 标签关闭后，view重置为初始状态
 */
@tabWrap({
    tabName: '编辑页面',
    stores: ['pageEdit']
})
@inject('pageEdit')
@observer
export default class extends React.Component {

    render() {
        const {view, getBrokerInfo, doDownload, handleInputChange, handleTabChange} = this.props.pageEdit;
        const {TabKey, Mobile, Code, getBrokerInfoFetchStatus, RecordList} = view;
        return (
            <Tabs activeKey={TabKey} onChange={handleTabChange}>
                <Tabs.TabPane key="tab1" tab={<div><span>查询经纪人</span><Badge count={this.props.xxx || 0}/></div>}>
                    <div>
                        <div style={{display: 'inline-flex', marginBottom: 8}}>
                            <Input name="Mobile" value={Mobile}
                                   placeholder="请输入" onChange={handleInputChange}/>
                            <Button onClick={getBrokerInfo}>查询</Button>
                        </div>
                        <Table
                            rowKey={'EmployeeID'} bordered={true} size='small' scroll={{x: 1500}}
                            pagination={false}
                            columns={[
                                {title: '经纪人ID', dataIndex: 'EmployeeID'},
                                {title: '经纪人工号', dataIndex: 'IDNum'},
                                {title: '登录名', dataIndex: 'LoginName'},
                                {title: '姓名', dataIndex: 'Name'},
                                {title: '会员注册时间', dataIndex: 'RegTime'},
                                {
                                    title: '是否有效', dataIndex: 'Status',
                                    render: text => text === 1 ? '有效' : '无效'
                                }
                            ]}
                            dataSource={RecordList.slice()} loading={getBrokerInfoFetchStatus === 'pending'}/>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane key="tab2" tab={<div><span>下载</span><Badge count={this.props.xx || 0}/></div>}>
                    <div style={{display: 'inline-flex', marginBottom: 8}}>
                        <Input name="Code" value={Code}
                               placeholder="请输入短信验证码" onChange={handleInputChange}/>
                        <Button onClick={doDownload}>下载</Button>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        );
    }
}