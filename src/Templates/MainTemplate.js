import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';

const MainTemplate = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer/>
        </div>
    );
};
export default MainTemplate;
