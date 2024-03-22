import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your combined reducers later
// import productReducer from './reducer/productReducer';



const store = configureStore({
    reducer: rootReducer,
    // productReducer:productReducer,
});

export default store;
