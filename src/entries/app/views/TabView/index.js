import React from 'react';
import {Tabs} from 'antd';
import {observer} from "mobx-react";

const TabPane = Tabs.TabPane;

@observer
export default class extends React.Component {

    /*  constructor(props) {
          super(props);
          console.log('constructor');
      }

      componentWillMount() {
          console.log('componentWillMount');
      }

      componentDidMount() {
          console.log('componentDidMount');
      }

      componentWillUpdate() {
          console.log('componentWillUpdate');
      }

      componentDidUpdate() {
          console.log('componentDidUpdate');
      }

      componentWillUnmount() {
          console.log('componentWillUnmount');
      }*/

    render() {
        const {tabList, activeKey, handleTabClick, handleTabEdit} = this.props;
        return (
            <Tabs hideAdd activeKey={activeKey} type="editable-card"
                  onEdit={handleTabEdit}
                  onTabClick={handleTabClick}>
                {[...tabList.entries()].map(item => <TabPane key={item[0]} tab={item[1].tabName}/>)}
            </Tabs>
        );
    }
}
