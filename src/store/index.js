import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import dogReducer from './slices/dogSlice';
import movieReducer from './slices/movieSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    dog: dogReducer,
    movie: movieReducer
  }
});