import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Col, Row, Carousel } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./login.scss"

const Login = () => {
    const [account, setaccount] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const onFinish = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                account: account,
                password: password
            });

            if (response.status === 200) {
                console.log('ok');
                const userInfo = `${account}`;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                alert("登入成功")
                history("/")
                window.location.reload();


            } else if (response.status === 401) {
                console.log('帳號或密碼錯');
                alert("帳號或密碼錯誤 請重新輸入！")
            }

        } catch (error) {
            console.error('请求失败:', error);
            alert("帳號或密碼錯誤 請重新輸入！")
        }
    };




    return (

        <div id='loginout' >
            <Row id='login'>
                <Col span={15}>
                    <Carousel autoplay className='Carousel' style={{ height: "100%" }}>
                        <div>
                        <a href="http://localhost:3000/product"></a>
                            <img
                                src="http://localhost:8000/img/login/1.png"
                                alt="Carousel 1"
                            />
                        </div>
                        <div>
                        <a href="http://localhost:3000/product"></a>
                            <img
                                // style={contentStyle}
                                src="http://localhost:8000/img/login/2.png"
                                alt="Carousel 2"
                            />
                        </div>
                        <div>
                            <img
                                // style={contentStyle}
                                src="http://localhost:8000/img/login/3.png"
                                alt="Carousel 3"
                            />
                        </div>
                    </Carousel>
                </Col>
                <Col span={9} id='login-right'>
                    <p className='logintitle'>登入</p>
                    <Form
                        layout="vertical"
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}

                    >
                        <Form.Item
                            label="帳號"
                            name="account"
                            rules={[
                                {
                                    required: true,
                                    message: '請輸入帳號！',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="請輸入帳號"
                                size='large'
                                value={account}
                                onChange={e => setaccount(e.target.value)} // 更新用户名的状态
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密碼"
                            rules={[
                                {
                                    required: true,
                                    message: '請輸入密碼！',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="請輸入密碼"
                                size='large'
                                value={password}
                                onChange={e => setPassword(e.target.value)} // 更新密码的状态
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>記住我</Checkbox>
                            </Form.Item>
                            <span className="login-form-forgot">忘記密碼</span>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ background: "#16778a", color: "#fff", width: "75%",height:"100%" }}
                            >
                                登入
                            </Button>
                            或 <a href="/RegistrationForm">註冊</a>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
