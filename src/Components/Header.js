import { Menu, Button, Badge, Modal, Dropdown, Space } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

const menuItems = [
    {
        key: '/',
        label: <NavLink to='/'>Home</NavLink>,
    },
    // { key: '/detail', label: <NavLink to='/detail'>Detail</NavLink> },
    { key: '/cart', label: <NavLink to='/cart'>Cart</NavLink> },
    { key: '/profile', label: <NavLink to='/profile'>Profile</NavLink> },
    { key: '/register', label: <NavLink to='/register'>Register</NavLink> },
    { key: '/search', label: <NavLink to='/search'>Search</NavLink> },
    { key: '/store', label: <NavLink to='/store'>Store</NavLink> },
    { key: '/login', label: <NavLink to='/login'>Login</NavLink> },
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
        label: <span>Logout</span>,
        onClick: () => {
            Modal.confirm({
                title: 'Do you want to logout?',
                onOk: () => {
                    localStorage.removeItem('token');
                    window.location.reload();
                },
            });
        },
    },
];

const Header = () => {
    const token = useSelector(state => state.authReducer.token);

    const profile = useSelector(state => state.profile);

    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState([]);
    const cart = useSelector(state => state.cart);

    const totalQuantityInCart = () => {
        let totalQuantity = 0;
        cart.forEach(item => {
            totalQuantity += item.quantity;
        });
        return totalQuantity;
    };

    useEffect(() => {
        const { pathname } = location;

        if (pathname === '/login') {
            setSelectedKeys(['/login']);
            return;
        }

        if (pathname === '' || pathname === '/') {
            setSelectedKeys(['/']);
            return;
        }

        const matchedKey = menuItems.find(item => item.to === pathname)?.key;

        if (matchedKey) {
            setSelectedKeys([matchedKey]);
        }
    }, [location, location.pathname]);
    return (
        <div>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{}}>
                    <NavLink to='/'>
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
                    {token ? (
                        <>
                            <span>Hello, {profile?.user?.name}</span>
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
                        </>
                    ) : (
                        <NavLink
                            to='/login'
                            style={{
                                marginRight: '10px',
                            }}>
                            <Button type='primary'>Login</Button>
                        </NavLink>
                    )}
                    <Badge count={totalQuantityInCart()} showZero={true}>
                        <NavLink
                            to={{
                                pathname: '/cart',
                            }}>
                            <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                        </NavLink>
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
};

export default Header;
