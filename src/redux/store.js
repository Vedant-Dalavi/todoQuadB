import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Correct import for redux-thunk
import taskReducer from './slices/taskSlice';
import authSlice from './slices/authSlice'
import themeSlice from './slices/themeSlice'

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        auth: authSlice,
        theme: themeSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
