import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue(`City "${city}" not found. Please check the spelling and try again.`);
      }
      return rejectWithValue('An error occurred while fetching weather data. Please try again later.');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch weather data';
      });
  }
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;