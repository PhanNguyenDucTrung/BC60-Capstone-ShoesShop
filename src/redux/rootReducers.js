import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from './reducers/cartSlice';

const rootReducer = combineReducers({
    cart: cartReducer,
});

export default rootReducer;
