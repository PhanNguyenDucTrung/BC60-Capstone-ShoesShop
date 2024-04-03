import { Button, Divider, Form, Input, Spin } from 'antd';
import { FilterOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { AutoComplete } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';
import '../assets/css/Product.css';
import CategorySelect from '../Components/CategorySelect.js';
import ProductItem from '../Components/ProductItem.js';

const suggestions = ['nike', 'adidas', 'puma', 'vans', 'converse'];

const Search = () => {
    const [form] = useForm();
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // Add a state for the sort order
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        const url = `https://shop.cyberlearn.vn/api/Product`;

        try {
            setIsLoading(true);

            const response = await axios({
                method: 'GET',
                url: url,
            });

            setProducts(response.data.content);
        } catch (error) {
            console.log('Failed:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const onFinish = values => {
        console.log('Received values of form: ', keyword);

        const url = `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios({
                    method: 'GET',
                    url: url,
                });

                console.log('Data:', response.data);
                setProducts(response.data.content);
            } catch (error) {
                console.log('Failed:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    };

    const sortProducts = () => {
        let order = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle the sort order
        const sortedProducts = _.orderBy(products, ['price'], [order]);
        setProducts([...sortedProducts]);
        setSortOrder(order); // Update the sort order
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container'>
            <h1>Search</h1>

            <Form onFinish={onFinish} form={form}>
                <AutoComplete
                    style={{ width: 400 }}
                    options={suggestions.map(keyword => ({ value: keyword }))}
                    onSelect={value => setKeyword(value)}
                    onSearch={value => setKeyword(value)}>
                    <Input
                        name='keyword'
                        prefix={
                            <span>
                                <SearchOutlined />{' '}
                            </span>
                        }
                        placeholder='Nhập từ khóa tìm kiếm...'
                    />
                </AutoComplete>
                <Button type='primary' htmlType='submit' style={{ marginLeft: '5px' }}>
                    Tìm kiếm
                </Button>
                <Divider />
            </Form>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <Button
                    type='primary'
                    icon={<FilterOutlined />}
                    onClick={sortProducts}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}>
                    Filter
                    {sortOrder === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                </Button>
                <div
                    style={{
                        marginInlineStart: '10px',
                    }}>
                    <CategorySelect setProducts={setProducts} />
                </div>

                <h3 style={{ width: '100%' }}>All Products</h3>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', minHeight: 800 }}>
                    <Spin />
                </div>
            ) : products.length === 0 ? (
                <div>No products found.</div>
            ) : (
                <div className='products-list'>
                    {products.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default Search;
