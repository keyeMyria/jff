import React from 'react';
import {Icon, Input} from 'antd';
import {inject, observer} from "mobx-react/index";
import {tabWrap} from "../index";

/**
 * 多tab页面，
 *
 */
@tabWrap({
    tabName: ({match, location, history}) => `pageA-${match.params.xxId}`,
    stores: ['pageAChild']
})
@inject('pageAChild')
@observer
export default class extends React.Component {

    render() {
        const {history, match, pageAChild} = this.props;
        const {value1, value2} = pageAChild.view;
        return (
            <div>
                <Icon type="rollback"/>
                <a onClick={() => {
                    history.push('/jff/pageA');
                }}>返回PageA</a>

                {match.params.xxId === 'step1' &&
                <div>
                    <a onClick={() => {
                        history.push('/jff/pageA/step2');
                    }}>toStep2</a>
                </div>}
                {match.params.xxId === 'step2' &&
                <div>
                    <a onClick={() => {
                        history.push('/jff/pageA/step1');
                    }}>toStep1</a>
                </div>}
                <div>this is pageA {match.params.xxId}</div>
                <Input value={value1} onChange={pageAChild.handleChange} name='value1' addonBefore='value1'/>
                <Input value={value2} onChange={pageAChild.handleChange} name='value2' addonBefore='value2'/>
            </div>
        );
    }
}