import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Alert, Avatar, Upload, Divider, Table, Empty, Tabs } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../Components/ProductItem.js';

import dataOrders from './productOrders.json';

console.log(dataOrders);
// import api from '../utils/config.js';
const { TabPane } = Tabs;
const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
        title: 'Image',
        dataIndex: 'img',
        key: 'img',
        render: (text, record) => (
            <img src={record.image} alt={record.name} style={{ width: '50px', height: '50px' }} />
        ),
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '100px',
        render: (text, record) => <span>${record?.price?.toFixed(2)}</span>,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        className: 'text-center',
        width: '300px',
        render: (text, record) => <span>{record.quantity}</span>,
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text, record) => <span>${(record.price * record.quantity).toFixed(2)}</span>,
    },
];
const Profile = () => {
    const [user, setUser] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [favoriteProducts, setFavoriteProducts] = useState([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10

    // alert
    const [message, setMessage] = useState({ text: '', type: 'success' });
    const [showAlert, setShowAlert] = useState(false);

    const uploadProps = {
        name: 'file',
        action: 'https://shop.cyberlearn.vn/api/Users/uploadavatar',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                console.log(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
    };

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

                const favoriteProducts = await axios({
                    method: 'GET',
                    url: 'https://shop.cyberlearn.vn/api/Users/getproductfavorite',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                });
                console.log('Favorite Products:', favoriteProducts.data.content);

                setFavoriteProducts(favoriteProducts.data.content.productsFavorite);

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
            setShowAlert(true);
            console.log('Failed to update profile:', error);
        }
    };

    return (
        <div className='container'>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <div
                    style={{
                        width: 600,
                        textAlign: 'center',
                        display: 'flex',
                        gap: 20,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Avatar
                        style={{
                            width: 100,
                            height: 100,
                            margin: 'auto',
                            display: 'block',
                        }}
                        src={user?.avatar}
                    />
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                <div style={{ width: 600, margin: 'auto' }}>
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

                        <Form.Item
                            label='Email'
                            name='email'
                            rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input disabled />
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
            </div>
            <Divider />

            <Tabs defaultActiveKey='1'>
                <TabPane tab='Favorite Products' key='1'>
                    <h2 style={{ textAlign: 'center' }}>Favorite Products</h2>
                    <div className='products-list'>
                        {favoriteProducts?.map(product => (
                            <ProductItem key={product.id} product={product} liked={true} />
                        ))}
                    </div>
                </TabPane>
                <TabPane tab='Orders' key='2'>
                    <Table
                        rowKey='id'
                        columns={columns}
                        dataSource={dataOrders ? dataOrders : user?.orders}
                        pagination={{
                            pageSize: 5, // Number of items per page
                        }}
                        locale={{
                            emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No Orders' />,
                        }}
                        expandedRowRender={record => {
                            const date = new Date(record.time);
                            const formattedDate = date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            });
                            return (
                                <p style={{ margin: 0, marginLeft: '50px' }}>
                                    Order has been placed on {formattedDate}
                                </p>
                            );
                        }}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};
export default Profile;
