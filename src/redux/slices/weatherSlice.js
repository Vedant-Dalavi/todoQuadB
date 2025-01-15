// src/redux/slices/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Key and Endpoint (Replace with your API key)
const WEATHER_API_KEY = 'your_api_key';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (location) => {
        const response = await axios.get(`${WEATHER_API_URL}?q=${location}&appid=${WEATHER_API_KEY}&units=metric`);
        return response.data;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.weather = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default weatherSlice.reducer;
