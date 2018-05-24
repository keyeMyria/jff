import React from 'react';
import {TabBar} from 'antd-mobile';
import '../../assets/test.less';
import SignIn from '../signIn';
import Other from '../other';
import Mine from '../mine';
import {inject, observer} from "mobx-react";

@inject(stores => ({
    selectedTab: stores.mainStore.selectedTab,
    handleTabChange: stores.mainStore.handleTabChange
}))
@observer
export default class extends React.Component {

    handleTabChange = this.props.handleTabChange;

    tabs = [
        {
            title: 'Home',
            selectedIcon: 'iconfont icon-homefill',
            icon: 'iconfont icon-home',
            badge: 1,
            content: <SignIn/>
        },
        {
            title: 'Other',
            selectedIcon: 'iconfont icon-friendfill',
            icon: 'iconfont icon-friend',
            badge: 'new',
            content: <Other/>
        },
        {
            title: 'Mine',
            selectedIcon: 'iconfont icon-myfill',
            icon: 'iconfont icon-my',
            dot: true,
            content: <Mine/>
        }
    ];

    render() {
        const {selectedTab} = this.props;
        return (
            <div className='home'>
                <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
                    {this.tabs.map(item => <TabBar.Item
                        title={item.title} key={item.title}
                        icon={<i className={item.icon}/>}
                        selectedIcon={<i className={item.selectedIcon}/>}
                        selected={selectedTab === item.title}
                        badge={item.badge} dot={item.dot}
                        onPress={() => this.handleTabChange(item.title)}>
                        {item.content}
                    </TabBar.Item>)}
                </TabBar>
            </div>
        );
    }
}
