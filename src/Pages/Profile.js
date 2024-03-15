import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // alert
    const [message, setMessage] = useState({ text: '', type: 'success' });
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (!token) {
            navigate('/login');
        }
        // Call API to get user info
        async function fetchData() {
            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://shop.cyberlearn.vn/api/Users/getProfile',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                });

                setUser(response.data.content);
                form.setFieldsValue(response.data.content);

                console.log('User:', response.data.content);

                if (response.status === 200) {
                    console.log('Profile:', response.data.content);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
                console.log('Failed:', error);
            }
        }
        fetchData();
    }, []);

    const onFinish = async values => {
        const token = localStorage.getItem('token');

        console.log('Received values of form: ', values);
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://shop.cyberlearn.vn/api/Users/updateProfile',

                data: values,

                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });
            console.log('Profile updated successfully:', response.data);
            if (response.status === 200) {
                setMessage({ text: 'Profile updated successfully!', type: 'success' });
                setShowAlert(true);
            } else {
                setMessage({ text: 'Failed to update profile.', type: 'error' });
                setShowAlert(true);
            }
        } catch (error) {
            setMessage({ text: 'Failed to update profile.', type: 'error' });

            console.log('Failed to update profile:', error);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: 'auto' }}>
            {showAlert && (
                <Alert
                    message={message.text}
                    type={message.type}
                    showIcon
                    closable
                    onClose={() => setShowAlert(false)}
                />
            )}

            <h2 style={{ textAlign: 'center' }}>Profile</h2>
            <Form
                form={form}
                name='profileForm'
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                initialValues={user} // Set initial values from user data
            >
                <Form.Item
                    label='Full Name'
                    name='name'
                    rules={[{ required: true, message: 'Please input your full name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label='Phone Number'
                    name='phone'
                    rules={[{ required: true, message: 'Please input your phone number!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Gender'
                    name='gender'
                    rules={[{ required: true, message: 'Please select your gender!' }]}>
                    <Radio.Group>
                        <Radio value={true}>Male</Radio>
                        <Radio value={false}>Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button type='primary' htmlType='submit'>
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Profile;
