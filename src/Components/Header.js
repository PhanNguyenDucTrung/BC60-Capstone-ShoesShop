<<<<<<< HEAD
import { Menu, Badge, Modal, Dropdown, Space } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
=======
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
>>>>>>> refs/remotes/origin/main

const menuItems = [
  {
    key: "/",
    label: <NavLink to="/">Home</NavLink>,
  },
  { key: "/detail", label: <NavLink to="/detail">Detail</NavLink> },
  { key: "/cart", label: <NavLink to="/cart">Cart</NavLink> },
  { key: "/profile", label: <NavLink to="/profile">Profile</NavLink> },
  { key: "/register", label: <NavLink to="/register">Register</NavLink> },
  { key: "/search", label: <NavLink to="/search">Search</NavLink> },
  { key: "/login", label: <NavLink to="/login">Login</NavLink> },
];

const items = [
    {
        key: '1',
        label: (
            <NavLink rel='noopener noreferrer' to='/profile'>
                Your Profile
            </NavLink>
        ),
    },
    {
        key: '2',
        label: (
            <NavLink rel='noopener noreferrer' to='/'>
                Your Orders
            </NavLink>
        ),
        // icon: <SmileOutlined />,
    },
    {
        key: '3',
        label: (
            <a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
                Settings
            </a>
        ),
    },
    {
        key: '4',
        danger: true,
        label: <NavLink to='/'>Logout</NavLink>,
    },
];

const Header = () => {
<<<<<<< HEAD
    const token = localStorage.getItem('token');

    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState([]);
    const cart = useSelector(state => state.cart);
    console.log('cart:', cart);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const { pathname } = location;

        if (pathname === '/login') {
            setSelectedKeys(['/login']);
            return;
        }

        const matchedKey = menuItems.find(item => item.to === pathname)?.key;

        if (matchedKey) {
            setSelectedKeys([matchedKey]);
        }
    }, [location]);
    return (
        <div>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{}}>
                    <NavLink href='/'>
                        <span
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: 'black',
                                marginRight: '10px',
                                lineHeight: '50px',
                            }}>
                            Shop
                        </span>
                        <img
                            style={{ width: '50px', height: '50px' }}
                            src='https://www.shutterstock.com/image-vector/air-jordan-sport-logo-icon-600nw-2270700541.jpg'
                            alt='icon'
                        />
                    </NavLink>
                </h3>

                <div>
                    {token && (
                        <Dropdown
                            menu={{
                                items,
                            }}>
                            <a className='ant-dropdown-link' href='/' onClick={e => e.preventDefault()}>
                                <Space>
                                    <UserOutlined style={{ fontSize: '24px', marginLeft: '10px' }} />
                                </Space>
                            </a>
                        </Dropdown>
                    )}
                    <Badge count={0} showZero={true}>
                        <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                    </Badge>
                </div>
            </div>
            <Menu
                mode='horizontal'
                selectedKeys={selectedKeys}
                onClick={({ key }) => setSelectedKeys([key])}
                items={menuItems}></Menu>
        </div>
    );
=======
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    // Extract the pathname from the current location
    const { pathname } = location;

    // Find the matching menu item key based on the pathname
    const matchedKey = menuItems.find((item) => item.to === pathname)?.key;

    // Update the selected key
    if (matchedKey) {
      setSelectedKeys([matchedKey]);
    }
  }, [location]);
  return (
    <>
    <div>
        
    </div>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        onClick={({ key }) => setSelectedKeys([key])}
        items={menuItems}
      ></Menu>
    </>
  );
>>>>>>> refs/remotes/origin/main
};

export default Header;
