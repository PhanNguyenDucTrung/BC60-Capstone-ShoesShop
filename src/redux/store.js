import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your combined reducers later

const store = configureStore({
    reducer: rootReducer,
});

export default store;
