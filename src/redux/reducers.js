import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    // Add more reducers as you create them
});

export default rootReducer;
