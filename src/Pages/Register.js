import { Button, Form, Input, Select, Checkbox, Alert } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

// const onFinish = values => {
//     console.log('Success:', values);
// };
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState({ text: '', type: 'success' });
    const [showAlert, setShowAlert] = useState(false);

    const onFinish = async values => {
        // Gửi dữ liệu đăng ký đến server
        console.log('Received values of form: ', values);
        try {
            const response = await axios.post('https://shop.cyberlearn.vn/api/Users/signup', values);
            console.log(response);
            if (response.status === 200) {
                setMessage({ text: 'Đăng ký thành công!', type: 'success' });
                setShowAlert(true);
            } else {
                setMessage({ text: 'Có lỗi xảy ra.', type: 'error' });
                setShowAlert(true);
            }
        } catch (error) {
            setMessage({ text: 'Có lỗi xảy ra.', type: 'error' });
            setShowAlert(true);
        }
        // Gọi API đăng ký

        // Nếu đăng ký thất bại

        // Nếu đăng ký thành công
        form.resetFields();

        // Reset form
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
                    marginTop: 50,
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
                    label='Username'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item name='gender' label='Giới tính'>
                    <Select>
                        <Select.Option value={true}>Nam</Select.Option>
                        <Select.Option value={false}>Nữ</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name='phone'
                    label='Số điện thoại'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                        {
                            pattern: /^(0|\+84)(\d{1,2})(\d{9})$/,
                            message: 'Số điện thoại không hợp lệ!',
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
                    name='confirm-password'
                    label='Xác nhận'
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Mật khẩu xác nhận không khớp!');
                            },
                        }),
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                    name='agreement'
                    valuePropName='checked'
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('Vui lòng đồng ý với điều khoản!')),
                        },
                    ]}>
                    <Checkbox>
                        I have read the <a href='/'>agreement</a>
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}>
                    <Button type='primary' htmlType='submit'>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
