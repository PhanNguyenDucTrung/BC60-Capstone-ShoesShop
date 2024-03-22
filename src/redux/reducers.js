import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './reducer/counterSlice';
import productReducer from './reducer/productReducer';

const rootReducer = combineReducers({
    counter: counterReducer,   
    productReducer:productReducer,
    // Add more reducers as you create them
    // Nếu đưa productReducer vào đây thì như nào?, có tác dụng không
    // dang lỗi ở không đưa state lên redux được
});

export default rootReducer;
