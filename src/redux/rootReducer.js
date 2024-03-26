import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from './reducers/cartSlice';
import productReducer from './reducers/productReducer';
import authReducer from './reducers/authSlice';
import profileReducer from './reducers/profileSlice';
const rootReducer = combineReducers({
    cart: cartReducer,
    productReducer: productReducer,
    authReducer: authReducer,
    profile: profileReducer,
});

export default rootReducer;
