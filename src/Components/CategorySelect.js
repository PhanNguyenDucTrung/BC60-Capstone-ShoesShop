import React, { useEffect } from 'react';
import { Cascader } from 'antd';
import axios from 'axios';

const CategorySelect = ({ handleCategoryChange, categories }) => {
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
