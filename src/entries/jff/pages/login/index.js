import React from 'react';
import {Input, Button} from 'antd';
import {authStore} from 'JFF/store';
import {getUser} from 'JFF/utils/JffStorage';
import {observer, inject} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('authStore')
@observer
export default class extends React.Component {

    render() {
        const {isAuth, view, handleLogin, handleChange} = this.props.authStore;
        const {phone, pwd} = view;
        return isAuth ?
            <Redirect to={{pathname: '/jff', state: {from: this.props.location}}}/> :
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#427cb2',
                height: '100vh'
            }}>
                <div style={{width: 300}}>
                    <div>this is Login Page</div>
                    <Input placeholder='手机' name='phone' onChange={handleChange} value={phone}
                           prefix={<i className='iconfont icon-my'/>} className='mt-8'/>
                    <div style={{display: 'flex', marginTop: 8}}>
                        <Input placeholder='验证码' name='pwd' onChange={handleChange} value={pwd}
                               prefix={<i className='iconfont icon-lock'/>}/>
                        <Button className='ml-8' type='primary'>获取验证码</Button>
                    </div>
                    <Button onClick={handleLogin} style={{width: '100%'}} type='primary' className='mt-16'>登录</Button>
                </div>
            </div>;
    }
}