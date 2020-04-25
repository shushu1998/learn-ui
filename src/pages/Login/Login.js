import React, {PureComponent} from 'react'
import {Input, Button, Select, Dialog} from 'nowrapper/lib/antd'
import Form, {FormItem, FormCore} from 'noform'
import {Card, message, Row, Col, Icon} from "antd";
import request from "../../utils/request";
import bj from '../../assets/bj2.jpg'
import styles from './login.less'
import Link from 'umi/link'
import router from 'umi/router'

const validate = {
    username: {type: "string", required: true, message: '登录名不能为空'},
    password: {type: "string", required: true, message: '登录密码不能为空'},
}

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate});
    }

    handleOperator = () => {
        console.log(this.core.value)
        this.core.validate((err) => {
            if (!err) {
                request.post('/learn/sysUser/login', {data: this.core.value}).then(res => {
                    if (res && res.flag) {
                        console.log(res.data.obj1.username)
                        sessionStorage.setItem("loginName", res.data.obj1.username)

                        router.push('/groupList/index')
                    } else{
                        message.error("账号或密码错误")
                    }
                })
            }
        })
    }
    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            //do somethings
            this.handleOperator()
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEnterKey);
    }

    render() {
        let backgroundImage = 'url(' + bj + ')'
        return (
            <div className={styles.wrapper}>
                <Form core={this.core} className={styles.login}>
                    <div className={styles.loginText}>登录</div>
                    <div className={styles.content}>
                        <FormItem name="username" defaultMinWidth={false}><Input style={{width: 255}}
                                                                                  autocomplete="off"
                                                                                  prefix={<Icon type="user"
                                                                                                style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                                                  placeholder="登录名"
                                                                                  size='large'/></FormItem>
                        <FormItem name="password" defaultMinWidth={false}><Input style={{width: 255}}
                                                                                      type="password" autocomplete="off"
                                                                                      prefix={<Icon type="lock"
                                                                                                    style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                                                      placeholder="密码"
                                                                                      size='large'/></FormItem>
                        <FormItem onKeydown={this.handleEnterKey}><Button size='large'
                                                                          style={{width: 255, marginTop: 20}}
                                                                          onClick={this.handleOperator}
                                                                          type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;录</Button></FormItem>
                    </div>

                </Form>
            </div>
        )
    }
}

export default Login;