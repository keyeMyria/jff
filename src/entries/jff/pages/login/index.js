import React from 'react';
import {Input, Button, Form, Row, Col, Icon} from 'antd';
import {authStore} from 'JFF/store';
import {getUser} from 'JFF/utils/JffStorage';
import {observer, inject} from "mobx-react";
import {Redirect} from 'react-router-dom';
import 'JFF/assets/less/pages/login.less';

const LoginForm = Form.create({
    mapPropsToFields: (props, fields) => ({
        phone: Form.createFormField({value: props.loginFormInfo.phone}),
        pwd: Form.createFormField({value: props.loginFormInfo.pwd})
    }),
    // onFieldsChange: (props, changedFields) => props.onFieldsChange(changedFields),
    onValuesChange: (props, changedValues, allValues) => props.onValuesChange(changedValues, allValues)
})(({form, handleLogin, loginEnable, sendCodeEnable}) => {
    const {getFieldDecorator} = form;
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleLogin(fieldsValue);
        });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item>
                {getFieldDecorator('phone', {
                    rules: [{required: true, message: '请输入正确的手机号'}]
                })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                          placeholder="手机" autoComplete="off"/>
                )}
            </Form.Item>
            <div className='login-form-item'>
                <Form.Item>
                    {getFieldDecorator('pwd', {
                        rules: [{required: true, message: '请输入正确的验证码'}]
                    })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="验证码"
                              autoComplete="off"/>
                    )}
                </Form.Item>
                <Button className='ml-8' type='primary' disabled={!sendCodeEnable}>获取验证码</Button>
            </div>
            <Button type="primary" htmlType="submit" className='w-100' disabled={!loginEnable}>登录</Button>
        </Form>
    );
});

@inject('authStore')
@observer
export default class extends React.Component {

    render() {
        const {isAuth, view, handleLogin, onFormChange, loginEnable, sendCodeEnable} = this.props.authStore;

        return isAuth ?
            <Redirect to={{pathname: '/jff', state: {from: this.props.location}}}/> :
            <div className='login-container'>
                <div>this is Login Page</div>
                <LoginForm onValuesChange={onFormChange} loginEnable={loginEnable} sendCodeEnable={sendCodeEnable}
                           handleLogin={handleLogin} loginFormInfo={view.loginFormInfo}/>
            </div>;
    }
}