import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Alert, Avatar, Upload, Divider, Table, Empty, Tabs } from 'antd';
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../Components/ProductItem.js';
import api from '../utils/config.js';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/reducers/profileSlice.js';
import { deleteOrder } from '../redux/reducers/profileSlice.js';
import { getApiProductAsync } from '../redux/reducers/productReducer.js';

const { TabPane } = Tabs;

const Profile = () => {
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
            render: (text, record) => (
                <span
                    style={{
                        textTransform: 'capitalize',
                    }}>
                    {record.name}
                </span>
            ),
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
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type='danger' onClick={() => handleDelete(record.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    const products = useSelector(state => state.productReducer.arrProduct);

    const handleDelete = async orderId => {
        const response = await api.post('/Users/deleteOrder', {
            orderId: orderId,
        });

        console.log('Response:', response);

        if (response.status === 200) {
            console.log('Order deleted successfully:', response.data);
            dispatch(deleteOrder(orderId));
        }

        if (!response.status === 200) {
            throw new Error(`Failed to delete order ${orderId}`);
        }
    };
    const [user, setUser] = useState(null);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ordersHistory = useSelector(state => state.profile?.user?.ordersHistory);

    const [favoriteProducts, setFavoriteProducts] = useState([]);

    console.log('Favorite Products:', favoriteProducts);

    // alert
    const [alertMessage, setAlertMessage] = useState({ text: '', type: 'success' });
    const [showAlert, setShowAlert] = useState(false);

    const uploadProps = {
        name: 'file',
        action: 'https://shop.cyberlearn.vn/api/Users/uploadavatar',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        beforeUpload: file => {
            const formData = new FormData();
            formData.append('avatar', file);
            formData.append('email', 'reung@gmail.com');

            // Manually upload the file
            fetch(uploadProps.action, {
                method: 'POST',
                headers: uploadProps.headers,
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(`${file.name} file uploaded successfully`);
                    message.success(`Avatar uploaded successfully`);
                })
                .catch(error => {
                    console.log(`${file.name} file upload failed.`);
                    message.error(`${file.name} file upload failed.`);
                });

            // Prevent the default upload behavior
            return false;
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

        if (!token) {
            console.log(token);
            console.log('No token found. Redirecting to login page...');
            navigate('/login');
        }
        dispatch(getApiProductAsync);
        // Call API to get user info
        async function fetchData() {
            try {
                const response = await api({
                    method: 'POST',
                    url: '/Users/getProfile',
                });

                const favoriteProducts = await api({
                    method: 'GET',
                    url: '/Users/getproductfavorite',
                });
                console.log('Favorite Products:', favoriteProducts.data.content);
                const updatedFavorites = favoriteProducts.data.content.productsFavorite.map(favorite => {
                    const correspondingProduct = products.find(product => product.id === favorite.id);
                    console.log('Favorite:', products);
                    console.log('Corresponding Product:', correspondingProduct);
                    return correspondingProduct ? { ...favorite, ...correspondingProduct } : favorite;
                });
                setFavoriteProducts(updatedFavorites);
                setUser(response.data.content);

                dispatch(
                    setProfile({
                        user: response.data.content,
                        favoriteProducts: favoriteProducts.data.content.productsFavorite,
                    })
                );

                form.setFieldsValue(response.data.content);

                if (response.status === 200) {
                    // console.log('Profile:', response.data.content);
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
        try {
            const response = await api({
                method: 'POST',
                url: '/Users/updateProfile',
                data: values,
            });
            console.log('Profile updated successfully:', response.data);
            if (response.status === 200) {
                setAlertMessage({ text: 'Profile updated successfully.', type: 'success' });
                setShowAlert(true);
            } else {
                setAlertMessage({ text: 'Failed to update profile.', type: 'error' });
                setShowAlert(true);
            }
        } catch (error) {
            setAlertMessage({ text: 'Failed to update profile.', type: 'error' });
            setShowAlert(true);
            console.log('Failed to update profile:', error);
        }
    };

    // delete order history
    const deleteAllOrders = async () => {
        for (const order of ordersHistory) {
            const response = await fetch('https://shop.cyberlearn.vn/api/Users/deleteOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: order.id,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to delete order ${order.id}`);
            }
        }

        // After all orders are deleted, you might want to update your state
        // setOrdersHistory([]);
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
                            message={alertMessage.text}
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
                        rowKey='key'
                        columns={columns}
                        dataSource={
                            ordersHistory?.flatMap((order, index) => {
                                return order.orderDetail.map((detail, detailIndex) => {
                                    console.log('Detail:', detail);
                                    return {
                                        id: order.id,
                                        key: `${order.id}-${detail.productId}-${detailIndex}`,
                                        productId: detail.productId,
                                        quantity: detail.quantity,
                                        time: order.date,
                                        isLastProduct: detailIndex === order.orderDetail.length - 1,
                                        price: detail.price,
                                        image: detail.image,
                                        name: detail.name,
                                    };
                                });
                            }) || []
                        }
                        expandable={{
                            expandedRowRender: record =>
                                record.isLastProduct ? (
                                    <p>
                                        {`Order date for product ${record.id}: ${new Date(
                                            record.time
                                        ).toLocaleString()}`}
                                    </p>
                                ) : null,
                            rowExpandable: record => record.isLastProduct,
                        }}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};
export default Profile;
