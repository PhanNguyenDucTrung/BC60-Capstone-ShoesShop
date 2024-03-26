import React, { useState } from 'react';
import { Button } from 'antd';
import { HeartOutlined, PlusOutlined, HeartFilled } from '@ant-design/icons';
import { Modal, Popover } from 'antd';
import { message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../utils/config';

const ProductItem = ({ product, liked }) => {
    // sử dụng dispatch để thêm sản phẩm vào giỏ hàng
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // sử dụng state để xác định sản phẩm đã được thích hay chưa

    const [isLiked, setIsLiked] = useState(liked);

    const token = localStorage.getItem('token');

    const handleLike = async () => {
        try {
            const response = await api.get(`/Users/like?productId=${product.id}`);

            if (response.status === 200) {
                message.success('Added to wishlist!');
            }

            console.log(response.data);
            setIsLiked(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Modal.warning({
                    title: 'Login Required',
                    content: 'Please log in to add products to your wishlist.',
                    okText: 'Login',
                    maskClosable: true,
                    onOk: () => {
                        navigate('/login');
                    },
                });
            }
            console.error(error);
        }
    };

    const handleUnlike = async () => {
        try {
            const response = await api(`https://shop.cyberlearn.vn/api/Users/unlike?productId=${product.id}`);

            if (response.status === 200) {
                message.success('Removed from wishlist!');
            }

            console.log(response.data);

            setIsLiked(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Modal.warning({
                    title: 'Login Required',
                    content: 'Please log in to add products to your wishlist.',
                });
            }
            console.error(error);
        }
    };

    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    return (
        <div key={product.id} className='product-card'>
            <p className='product-wishlist' onClick={isLiked ? handleUnlike : handleLike}>
                {isLiked ? <HeartFilled /> : <HeartOutlined />}
            </p>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <div className='price'>
                {product.price ? `$ ${product.price}` : <p className='text-center'>Amazing price for you</p>}
            </div>

            <Popover content={product?.description?.length > 80 ? product.description : 'No description'}>
                <p className='description px-1'>
                    {product?.description?.length > 80
                        ? product.description.substring(0, 70) + '...'
                        : product.description}
                </p>
            </Popover>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}>
                <div className='quantity'>
                    <button onClick={handleDecrease} className='quantityButton'>
                        <i className='fa-solid fa-minus'></i>
                    </button>
                    <span style={{ paddingInline: 2, width: 20, textAlign: 'center' }}>{quantity}</span>
                    <button onClick={handleIncrease} className='quantityButton'>
                        <i className='fa-solid fa-plus'></i>
                    </button>
                </div>
                <Button type='primary' className='custom-button'>
                    <PlusOutlined />
                </Button>
                <Button type='primary'>Buy Now</Button>
            </div>
        </div>
    );
};
export default ProductItem;
