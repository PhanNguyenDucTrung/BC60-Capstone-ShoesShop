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
            console.log(state.user);
            state.favoriteProducts = action.payload.favoriteProducts;
        },
    },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
