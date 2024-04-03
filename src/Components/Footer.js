import React from 'react';

const Footer = () => {
    return (
        <div className='bg-dark container-fluid p-5 footer mt-4'>
            <div className='row'>
                <div className='col-md-3 text-light'>
                    <p className=''>Logo here</p>
                    <p
                        style={{
                            fontSize: '2.4rem',
                        }}>
                        The BRAND YOU NEED
                    </p>
                </div>
                <div className='col-md-3'>
                    <h3 className='text-light'>Information</h3>
                    <ul>
                        <li>
                            <a href='/' className='text-light hover-effect'>
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href='/' className='text-light hover-effect'>
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href='/' className='text-light hover-effect'>
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href='/' className='text-light hover-effect'>
                                About
                            </a>
                        </li>
                        <li>
                            <a href='/' className='text-light hover-effect'>
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='col-md-3'>
                    <h3 className='text-light'>Social Media</h3>

                    <ul>
                        <li>
                            {' '}
                            <a href='/' className='text-light hover-effect'>
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href='/' className='text-light hover-effect'>
                                Twitter
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href='/' className='text-light hover-effect'>
                                Instagram
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href='/' className='text-light hover-effect'>
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href='/' className='text-light hover-effect'>
                                Youtube
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='col-md-3'>
                    <h3 className='text-light'>Newsletter</h3>
                    <p className='text-light'>Subscribe to our newsletter</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type='text'
                            placeholder='Enter your email'
                            style={{
                                padding: '7px',
                                flex: 1,
                                borderRadius: '5px',
                            }}
                        />
                        <button className='btn btn-primary' style={{ height: 'fit-content', marginLeft: '10px' }}>
                            Subscribe
                        </button>
                    </div>
                </div>
                <p className='text-light text-center col-12'>© 2021. Made with 🤦‍♂️ by me All rights reserved</p>
            </div>
        </div>
    );
};
export default Footer;
