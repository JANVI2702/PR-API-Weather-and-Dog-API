import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBreeds = createAsyncThunk(
  'dog/fetchBreeds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      return Object.keys(response.data.message);
    } catch (error) {
      return rejectWithValue('Failed to fetch dog breeds. Please try again later.');
    }
  }
);

export const fetchBreedImages = createAsyncThunk(
  'dog/fetchBreedImages',
  async (breed, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(`Failed to fetch images for ${breed}. Please try again later.`);
    }
  }
);

const dogSlice = createSlice({
  name: 'dog',
  initialState: {
    breeds: [],
    filteredBreeds: [],
    selectedBreed: '',
    images: [],
    loading: false,
    error: null,
    currentPage: 1,
    imagesPerPage: 9,
    totalPages: 0
  },
  reducers: {
    filterBreeds: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredBreeds = state.breeds.filter(breed => 
        breed.toLowerCase().includes(query)
      );
    },
    selectBreed: (state, action) => {
      state.selectedBreed = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.breeds = action.payload;
        state.filteredBreeds = action.payload;
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBreedImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBreedImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
        state.totalPages = Math.ceil(action.payload.length / state.imagesPerPage);
      })
      .addCase(fetchBreedImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.images = [];
      });
  }
});

export const { filterBreeds, selectBreed, setPage } = dogSlice.actions;
export default dogSlice.reducer;