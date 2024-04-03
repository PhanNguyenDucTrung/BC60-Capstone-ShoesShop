import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : {},
        favoriteProducts: [],
    },

    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload.user;
            state.favoriteProducts = action.payload.favoriteProducts;
        },
        deleteOrder: (state, action) => {
            state.user.ordersHistory = state.user.ordersHistory.filter(order => order.id !== action.payload);
        },
    },
});

export const { setProfile, deleteOrder } = profileSlice.actions;

export default profileSlice.reducer;
