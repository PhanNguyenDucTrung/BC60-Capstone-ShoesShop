import React from 'react';
import { Cascader } from 'antd';
import axios from 'axios';

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

const CategorySelect = (
    { setProducts } // Assume you have a products state
) => {
    // Parse data
    const categories = data.content.map(item => ({
        value: item.id,
        label: item.category,
        children: JSON.parse(item.categoryChild).map(child => ({
            value: child.id,
            label: child.category,
        })),
    }));

    const handleCategoryChange = async (value, selectedOptions) => {
        console.log(value, selectedOptions);

        if (selectedOptions.length === 0) return;

        const category = selectedOptions[selectedOptions.length - 1].value;

        console.log('Fetching products for category:', category);

        try {
            const response = await axios({
                method: 'GET',
                url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${category}`,
            });

            console.log('Data:', response.data);
            setProducts(response.data.content); // Assume you have a products state
        } catch (error) {
            console.log('Failed:', error);
        }
    };

    return (
        <Cascader
            options={categories}
            placeholder='All categories'
            onChange={(value, selectedOptions) => {
                handleCategoryChange(value, selectedOptions);
            }}
            changeOnSelect={true}
        />
    );
};

export default CategorySelect;
