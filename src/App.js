import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainTemplate from './Templates/MainTemplate.js';
import HomePage from './Pages/Home.js';
import DetailPage from './Pages/Detail.js';
import CartPage from './Pages/Cart.js';
import LoginPage from './Pages/Login.js';
import ProfilePage from './Pages/Profile.js';
import RegisterPage from './Pages/Register.js';
import SearchPage from './Pages/Search.js';
import StorePage from './Pages/Store.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<MainTemplate />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/detail' element={<DetailPage />}>
                        <Route path=':id' element={<DetailPage />} />
                    </Route>
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/store' element={<StorePage />} />
                    <Route path='/login' element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
