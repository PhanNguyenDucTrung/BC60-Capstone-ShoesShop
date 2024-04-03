import React, { useEffect, useMemo, useState } from 'react';
import { Button, Popconfirm, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/reducers/cartSlice';
import { Modal } from 'antd';

const Cart = () => {
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return <NavLink to={`/detail/${record.id}`}> {text} </NavLink>;
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleIncrease(record.id)}>+</Button>
                    <span style={{ margin: '0 10px' }}>{text}</span>
                    <Button onClick={() => handleDecrease(record.id)}>-</Button>
                </div>
            ),
        },
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'image',
            render: (text, record) => {
                return <img src={record.image} alt={record.alias} width={100} />;
            },
        },
        {
            title: 'Total',
            dataIndex: 'total',
            // key:'total',
            render: (_, record) => record.quantity * record.price,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (
                _,
                record // Render nút Xóa
            ) => (
                <Popconfirm
                    title='Bạn có chắc chắn muốn xóa tất cả sản phẩm được chọn?'
                    onConfirm={() => handleRemoveFromCart(record.id)}
                    okText='Yes'
                    cancelText='No'>
                    <Button className='btnDlt'>Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    const dispatch = useDispatch();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const cartItemsFromRedux = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState(cartItemsFromRedux);
    const navigate = useNavigate();
    const user = useSelector(state => state.profile.user);
    const token = useSelector(state => state.authReducer.token);
    console.log(token);
    useEffect(() => {
        if (!token) {
            navigate('/login');
            alert('Vui lòng đăng nhập để sử dụng trang!!');
        }
    }, [navigate, token]);

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItemsFromLocalStorage.length > 0) {
            const updatedCartItems = cartItemsFromLocalStorage.map(itemFromLocalStorage => {
                const existingItem = cartItemsFromRedux.find(item => item.id === itemFromLocalStorage.id);
                if (existingItem) {
                    return {
                        ...existingItem,
                        quantity: itemFromLocalStorage.quantity,
                    };
                } else {
                    return itemFromLocalStorage;
                }
            });
            setCartItems(updatedCartItems);
        }
    }, [cartItemsFromRedux]);

    useEffect(() => {
        const totalPrice = cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
        setTotalPrice(totalPrice);
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cartItemsFromLocalStorage);
    }, [cartItemsFromRedux]);
    useEffect(() => {
        setCartItems(cartItemsFromRedux);
    }, [cartItemsFromRedux]);

    const mergeCartItems = (reduxItems, localStorageItems) => {
        const mergedItems = {};
        [...reduxItems, ...localStorageItems].forEach(item => {
            if (mergedItems[item.id]) {
                mergedItems[item.id].quantity += item.quantity;
            } else {
                mergedItems[item.id] = { ...item };
            }
        });
        return Object.values(mergedItems);
    };

    const handleDecrease = recordId => {
        const updatedCartItems = cartItems.map(item =>
            item.id === recordId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCartItems);
    };

    const handleIncrease = recordId => {
        const updatedCartItems = cartItems.map(item =>
            item.id === recordId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
    };

    const handleRemoveFromCart = recordId => {
        dispatch(removeFromCart(recordId));
    };

    const handleSubmit = async () => {
        if (cartItems.length === 0) {
            message.warning('Your cart is empty, please add some items to cart!');
            return;
        }

        if (selectedRowKeys.length === 0) {
            message.warning('Please select at least one item to submit!');
            return;
        }

        selectedRowKeys.forEach(recordId => {
            handleRemoveFromCart(recordId);
        });

        const response = await fetch('https://shop.cyberlearn.vn/api/Users/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderDetail: selectedRowKeys.map((recordId, index) => ({
                    productId: recordId,
                    quantity: cartItems[index].quantity,
                })),
                email: user.email,
            }),
        });

        if (response.ok) {
            message.success('Order submitted successfully!');
            setSelectedRowKeys([]);
        } else {
            message.error('Failed to submit order');
        }
    };

    const handleDeleteAll = () => {
        if (selectedRowKeys.length > 0) {
            Modal.confirm({
                title: 'Xác nhận',
                content: 'Bạn có chắc chắn muốn xóa tất cả sản phẩm được chọn?',
                onOk() {
                    selectedRowKeys.forEach(recordId => {
                        handleRemoveFromCart(recordId);
                    });
                    setSelectedRowKeys([]);
                },
                onCancel() {},
            });
        } else {
            alert('Bạn chưa chọn sản phẩm để xóa!');
        }
    };
    const memoizedCartItems = useMemo(() => cartItems, [cartItems]);

    const onSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className='container'>
            <div
                style={{
                    marginBottom: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                <div>
                    <Button type='primary' onClick={start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <div>
                    <Button className='btnSubmit' onClick={handleSubmit}>
                        SUBMIT ORDER
                    </Button>
                    <Button className='btnDelete' onClick={handleDeleteAll}>
                        DELETE ALL
                    </Button>
                </div>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={memoizedCartItems.map(item => ({
                    ...item,
                    key: item.id,
                }))}
            />

            <span style={{ marginRight: 10 }}>Total Price: ${totalPrice}</span>
        </div>
    );
};

export default Cart;
