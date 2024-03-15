import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header.js';
const MainTemplate = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};
export default MainTemplate;
