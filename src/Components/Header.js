import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const menuItems = [
    {
        key: '/',
        label: <NavLink to='/'>Home</NavLink>,
    },
    { key: '/detail', label: <NavLink to='/detail'>Detail</NavLink> },
    { key: '/cart', label: <NavLink to='/cart'>Cart</NavLink> },
    { key: '/profile', label: <NavLink to='/profile'>Profile</NavLink> },
    { key: '/register', label: <NavLink to='/register'>Register</NavLink> },
    { key: '/search', label: <NavLink to='/search'>Search</NavLink> },
    { key: '/login', label: <NavLink to='/login'>Login</NavLink> },
];

const Header = () => {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        // Extract the pathname from the current location
        const { pathname } = location;

        // Find the matching menu item key based on the pathname
        const matchedKey = menuItems.find(item => item.to === pathname)?.key;

        // Update the selected key
        if (matchedKey) {
            setSelectedKeys([matchedKey]);
        }
    }, [location]);
    return (
        <Menu
            mode='horizontal'
            selectedKeys={selectedKeys}
            onClick={({ key }) => setSelectedKeys([key])}
            items={menuItems}></Menu>
    );
};

export default Header;
