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
import { useSearchParams } from 'react-router-dom';

const suggestions = ['nike', 'adidas', 'puma', 'vans', 'converse'];

const Search = () => {
    const data = {
        statusCode: 200,
        message: 'Thành công!',
        content: [
            {
                id: 'ADIDAS',
                category: 'ADIDAS',
                categoryParent: '[{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
                categoryChild: '[]',
                deleted: false,
                productList: '[1,2,3,4,5,6,7,8]',
                alias: 'adidas',
            },
            {
                id: 'MEN',
                category: 'MEN',
                categoryParent: '[]',
                categoryChild:
                    '[{"id":"NIKE","category":"NIKE"},{"id":"ADIDAS","category":"ADIDAS"},{"id":"VANS_CONVERSE","category":"VANS CONVERSE"}]',
                deleted: false,
                productList: '[2,4,6,8,10,12,14,16,18,19]',
                alias: 'men',
            },
            {
                id: 'NIKE',
                category: 'NIKE',
                categoryParent: '[{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
                categoryChild: '[]',
                deleted: false,
                productList: '[9,10,11,12,13,14,15,16]',
                alias: 'nike',
            },
            {
                id: 'VANS_CONVERSE',
                category: 'VANS CONVERSE',
                categoryParent: '[{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
                categoryChild: '[]',
                deleted: false,
                productList: '[17,18,19]',
                alias: 'vans-converse',
            },
            {
                id: 'WOMEN',
                category: 'WOMEN',
                categoryParent: '[]',
                categoryChild:
                    '[{"id":"NIKE","category":"NIKE"},{"id":"ADIDAS","category":"ADIDAS"},{"id":"VANS_CONVERSE","category":"VANS CONVERSE"}]',
                deleted: false,
                productList: '[1,3,5,7,9,10,11,13,15,17,18,19]',
                alias: 'women',
            },
        ],
        dateTime: '2024-03-21T14:13:21.4813176+07:00',
    };

    const categories = data.content.map(cat => {
        return {
            value: cat.id,
            label: cat.category,
            children: cat.categoryChild
                ? JSON.parse(cat.categoryChild).map(child => {
                      return {
                          value: child.id,
                          label: child.category,
                      };
                  })
                : [],
        };
    });

    const [form] = useForm();
    const [params, setParams] = useSearchParams();
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // Add a state for the sort order
    const [isLoading, setIsLoading] = useState(false);
    const handleCategoryChange = async (value, selectedOptions) => {
        if (!selectedOptions) return;
        const category = selectedOptions[selectedOptions.length - 1].value;
        const newParams = { ...params, categoryId: category };
        setParams(newParams);

        if (!selectedOptions || selectedOptions.length === 0) return;

        try {
            const params = new URLSearchParams(newParams).toString();
            const response = await axios({
                method: 'GET',
                url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?${params}`,
            });

            console.log('Data:', response.data);
            setProducts(response.data.content); // Assume you have a products state
        } catch (error) {
            console.log('Failed:', error);
        }
    };
    const fetchData = async keyword => {
        const url = `https://shop.cyberlearn.vn/api/Product`;

        try {
            setIsLoading(true);

            const response = await axios({
                method: 'GET',
                url: url,
                params: keyword ? { keyword } : {},
            });

            setProducts(response.data.content);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };
    const onFinish = values => {
        console.log('Received values of form: ', values);
        if (values.keyword) {
            setParams({ keyword: values.keyword });
        } else {
            params.delete('keyword');

            setParams(params);
        }
    };

    const sortProducts = () => {
        let order = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle the sort order
        const sortedProducts = _.orderBy(products, ['price'], [order]);
        setProducts([...sortedProducts]);
        setSortOrder(order); // Update the sort order
    };

    useEffect(() => {
        const keyword = params.get('keyword');

        if (keyword) {
            fetchData(keyword);
        }
        const category = params.get('categoryId');
        if (category) {
            const findCategory = (categories, category) => {
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i].value === category) {
                        return [categories[i]];
                    }
                    if (categories[i].children) {
                        const path = findCategory(categories[i].children, category);
                        if (path.length) {
                            return [categories[i], ...path];
                        }
                    }
                }
                return [];
            };

            const selectedOptions = findCategory(categories, category);
            handleCategoryChange([category], selectedOptions);
        }
    }, [params]);

    useEffect(() => {}, []);
    return (
        <div className='container'>
            <h1>Search</h1>
            <Form
                onFinish={onFinish}
                form={form}
                style={{
                    display: 'flex',
                }}>
                <Form.Item name='keyword' style={{ width: 400 }}>
                    <AutoComplete
                        style={{ width: 400 }}
                        options={suggestions.map(keyword => ({ value: keyword }))}
                        onSearch={value => setKeyword(value)}
                        allowClear>
                        <Input
                            name='keyword'
                            prefix={
                                <span>
                                    <SearchOutlined />
                                </span>
                            }
                            placeholder='Nhập từ khóa tìm kiếm...'
                        />
                    </AutoComplete>
                </Form.Item>

                <Button type='primary' htmlType='submit' style={{ marginLeft: '5px' }}>
                    Tìm kiếm
                </Button>
            </Form>
            <Divider />
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
                    <CategorySelect
                        setProducts={setProducts}
                        setParams={setParams}
                        params={params}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                    />
                </div>

                <h3 style={{ width: '100%' }}>
                    {params.get('keyword')
                        ? `Results for "${params.get('keyword')}"`
                        : params.get('categoryId')
                        ? `Results for category "${params.get('categoryId')}"`
                        : 'All Products'}
                </h3>
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
