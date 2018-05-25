import React from "react";
import {Layout, Icon} from 'antd';
import '../assets/main.less';
import mainTab from "../routes/mainTab";
import TabView from "../views/TabView";
import NavView from "../views/NavView";
import {INIT_NAV} from '../config/NavConfig';
import {Switch, Route, Redirect} from 'react-router-dom';
import {observer} from "mobx-react";

const {Header, Content, Footer} = Layout;

@observer
export default class extends React.Component {

    render() {
        const {tabList, tabActiveKey, handleTabPageChange, handleTabEdit, navOpenKeys, navCollapsed, handleNavOpenChange, handleNavToggle} = this.props.homeStore;

        return (
            <Layout className='main-layout-container'>
                <NavView collapsed={navCollapsed}
                         openKeys={navOpenKeys.slice()}
                         selectedKeys={[tabActiveKey]}
                         handleMenuOpenChange={handleNavOpenChange}
                         handleMenuItemClick={(obj) => handleTabPageChange(obj.key)}/>
                <Layout>
                    <Header className='main-layout-header'>
                        <Icon className="trigger"
                              type={navCollapsed ? 'menu-unfold' : 'menu-fold'}
                              onClick={handleNavToggle}/>
                        <span style={{marginLeft: 8, fontSize: 24, fontStyle: 'bold'}}>记返费后台</span>
                    </Header>
                    <TabView
                        tabList={tabList}
                        handleTabEdit={handleTabEdit}
                        handleTabClick={handleTabPageChange}
                        activeKey={tabActiveKey}/>
                    <Content className='main-layout-content-container'>
                        <div className='main-layout-content'>
                            <Switch>
                                {mainTab.children.map(route =>
                                    <Route key={route.path}
                                           path={route.path}
                                           exact={route.exact || true}
                                           component={route.component}
                                    />)}
                                {INIT_NAV && INIT_NAV.id && INIT_NAV.path && <Redirect to={INIT_NAV.path}/>}
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Test footer
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}