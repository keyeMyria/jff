import React from 'react';
import {NavBar, Icon} from 'antd-mobile';

export default class Mine extends React.Component {


    render() {
        return (
            <div style={{height: '100%'}}>
                <NavBar
                    mode="light"
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
                        <Icon key="1" type="ellipsis"/>
                    ]}
                >Mine</NavBar>

            </div>
        );
    }
}