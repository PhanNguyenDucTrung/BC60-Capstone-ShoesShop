import { Alert, Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState({ text: '', type: 'success' });
    const [showAlert, setShowAlert] = useState(false);

    const onFinish = async values => {
        console.log('Success:', values);

        // Gọi API đăng nhập

        try {
            const response = await axios.post('https://shop.cyberlearn.vn/api/Users/signin', values);
            console.log(response);

            // Nếu đăng nhập thành công
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.content.accessToken));
                setMessage({ text: 'Đăng nhập thành công!', type: 'success' });
                setShowAlert(true);
                // Waiting 1s before redirecting to home page
                // setTimeout(() => {
                //     window.location.href = '/';
                // }, 1000);
                // Chuyển hướng về trang chủ
                // window.location.href = '/'; // Dữ liệu redux sẽ mất khi chuyển trang
            }
            // Nếu đăng nhập thất bại
            else {
                setMessage({ text: 'Có lỗi xảy ra.', type: 'error' });
                setShowAlert(true);
            }
        } catch (error) {
            console.log('Failed:', error);
            setMessage({ text: 'Có lỗi xảy ra.', type: 'error' });
            setShowAlert(true);
        }

        // Lưu thông tin user xuống localStorage
    };

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
                        offset: 4,
                        span: 16,
                    }}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;
