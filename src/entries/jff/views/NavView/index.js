import React from 'react';
import {Layout, Icon, Menu} from 'antd';
import {NAV_LIST} from '../../config/NavConfig';

export default class extends React.Component {

    render() {
        const {collapsed, openKeys, selectedKeys, handleMenuItemClick, handleMenuOpenChange} = this.props;
        return (
            <Layout.Sider collapsed={collapsed}>
                <div className="logo"/>
                <Menu theme="dark" mode="inline"
                      openKeys={openKeys}
                      selectedKeys={selectedKeys}
                      onOpenChange={handleMenuOpenChange}
                      onClick={handleMenuItemClick}>
                    {translateHtml(NAV_LIST)}
                </Menu>
            </Layout.Sider>
        );
    }
}

const translateHtml = (navList, role) => {
    // let role = AppSessionStorage.LOGIN_INFO_SESSION_STORAGE.getItem('role');
    return navList.reduce((pre, cur) => {
        // if (this.judgeRole(item.role, role))
        if (cur.sub && cur.sub.length) {
            pre.push(
                <Menu.SubMenu key={cur.id}
                              title={<span>
                                {cur.iconType && <Icon type={cur.iconType}/>}
                                  <span>{cur.name}</span>
                              </span>}>
                    {translateHtml(cur.sub, role)}
                </Menu.SubMenu>
            );
        } else {
            pre.push(
                <Menu.Item key={cur.path}>
                    {cur.iconType && <Icon type={cur.iconType}/>}
                    <span>{cur.name}</span>
                </Menu.Item>
            );
        }
        return pre;
    }, []);
};
