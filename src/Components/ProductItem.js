import React, { useState } from 'react';
import { Button } from 'antd';
import { HeartOutlined, PlusOutlined, HeartFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const ProductItem = ({ product, liked }) => {
    // sử dụng dispatch để thêm sản phẩm vào giỏ hàng
    const dispatch = useDispatch();

    // sử dụng state để xác định sản phẩm đã được thích hay chưa

    const [isLiked, setIsLiked] = useState(liked);

    const token = localStorage.getItem('token');

    const handleLike = async () => {
        try {
            const response = await axios.get(`https://shop.cyberlearn.vn/api/Users/like?productId=${product.id}`, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token), // replace 'token' with your actual token
                },
            });

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
                });
            }
            console.error(error);
        }
    };

    const handleUnlike = async () => {
        try {
            const response = await axios.get(`https://shop.cyberlearn.vn/api/Users/unlike?productId=${product.id}`, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token),
                },
            });

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

    return (
        <div key={product.id} className='product-card'>
            <p className='product-wishlist' onClick={isLiked ? handleUnlike : handleLike}>
                {isLiked ? <HeartFilled /> : <HeartOutlined />}
            </p>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p className='price'>${product.price}</p>

            <p className='description px-1'>
                {product?.description?.length > 80 ? product.description.substring(0, 70) + '...' : product.description}
            </p>

            <Button type='primary' className='custom-button'>
                <PlusOutlined />
            </Button>
        </div>
    );
};
export default ProductItem;
