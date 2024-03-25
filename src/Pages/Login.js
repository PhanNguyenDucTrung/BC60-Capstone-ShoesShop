import { Alert, Button, Form, Input, Result } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [form] = Form.useForm();
    const [message, setMessage] = useState({ text: '', type: 'success' });
    const [showAlert, setShowAlert] = useState(false);

    const onFinish = async values => {
        console.log('Success:', values);
        try {
            const response = await axios.post('https://shop.cyberlearn.vn/api/Users/signin', values);
            console.log(response);

            // Nếu đăng nhập thành công
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.content.accessToken));
                setMessage({ text: 'Đăng nhập thành công!', type: 'success' });
                setShowAlert(true);
                setIsLoggedIn(true);

                // Chuyển hướng về trang chủ
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            // Nếu đăng nhập thất bại
            else if (response.status === 404) {
                throw new Error(response.data.message);
                // setMessage({ text: response.message, type: 'error' });
                // setShowAlert(true);
            }
        } catch (error) {
            console.log('Failed:', error);
            setMessage({ text: error.response?.data?.message || 'Đăng nhập thất bại!', type: 'error' });
            setShowAlert(true);
        }
    };

    if (isLoggedIn) {
        return (
            <Result
                status='success'
                title='Đăng nhập thành công!'
                subTitle='Chuyển hướng đến trang chủ trong giây lát...'
                extra={[
                    <Button type='primary' key='console' onClick={() => navigate('/home')}>
                        Go Home
                    </Button>,
                ]}
            />
        );
    }

    return (
        <div>
            {showAlert && (
                <Alert
                    message={message.text}
                    type={message.type}
                    showIcon
                    closable
                    onClose={() => setShowAlert(false)}
                />
            )}
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <Form
                form={form}
                name='basic'
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    minHeight: '60vh',
                    margin: 'auto',
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'>
                <Form.Item
                    name='email'
                    label='Email'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                        {
                            type: 'email',
                            message: 'Email không hợp lệ!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 15,
                        span: 16,
                    }}>
                    <Link href='/forgot-password' style={{ marginLeft: '15px' }}>
                        Quên mật khẩu?
                    </Link>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}>
                    <Button type='primary' htmlType='submit'>
                        Login
                    </Button>
                    Or <Link to='/register'>No account? Create one</Link>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;
