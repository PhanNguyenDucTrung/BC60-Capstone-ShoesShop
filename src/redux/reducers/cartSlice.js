import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
      addToCart: (state, action) => {
        const newItem = action.payload;
        const existingItem = state.find(item => item.id === newItem.id);
        if (existingItem) {
            existingItem.quantity += newItem.quantity;
        } else {
            state.push(newItem);
        }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      return state.filter(item => item.id !== itemId);
    },
    decreaseQuantity: (state, action) => {
        const item = state.find(item => item.id === action.payload);
        if (item && item.quantity > 1) {
            item.quantity--;
        }
    },
    increaseQuantity: (state, action) => {
        const item = state.find(item => item.id === action.payload);
        if (item) {
            item.quantity++;
        }
    },
        
    },
});

export const { addToCart, removeFromCart,decreaseQuantity ,increaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;

// export const decreaseQuantity = (productId) => {
//     return {
//       type: 'DECREASE_QUANTITY',
//       payload: productId,
//     };
//   };
  
//   export const increaseQuantity = (productId) => {
//     return {
//       type: 'INCREASE_QUANTITY',
//       payload: productId,
//     };
//   };
