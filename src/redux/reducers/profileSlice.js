import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    favoriteProducts: [],
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
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
