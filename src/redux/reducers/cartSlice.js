import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
           state.filter(item => item.id !== action.payload.id);
        },
        
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

export const decreaseQuantity = (productId) => {
    return {
      type: 'DECREASE_QUANTITY',
      payload: productId,
    };
  };
  
  export const increaseQuantity = (productId) => {
    return {
      type: 'INCREASE_QUANTITY',
      payload: productId,
    };
  };
