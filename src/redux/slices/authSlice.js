import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for a logged-in user
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: !!loggedInUser, // Set to true if a user exists in localStorage
        user: loggedInUser || null, // Set the user object if it exists
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('loggedInUser', JSON.stringify(action.payload)); // Save user to localStorage
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('loggedInUser'); // Remove user from localStorage
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;