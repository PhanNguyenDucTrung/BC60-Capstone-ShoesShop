import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from './reducers/cartSlice';
import productReducer from './reducer/productReducer';
const rootReducer = combineReducers({
    cart: cartReducer,
    productReducer: productReducer,
});

export default rootReducer;
