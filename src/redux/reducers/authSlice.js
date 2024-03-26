import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: localStorage.getItem('token') },
    reducers: {
        logout: state => {
            state.token = null;
        },
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
