import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchMovies = createAsyncThunk(
  'movie/searchMovies',
  async ({ searchQuery, page, year, type }, { rejectWithValue }) => {
    try {
      if (!searchQuery) {
        return { movies: [], totalResults: 0 };
      }
      
      const params = {
        apikey: 'a869102',
        s: searchQuery,
        page: page || 1,
        type: type !== 'all' ? type : undefined,
        y: year || undefined
      };
      
      const response = await axios.get('https://www.omdbapi.com/', { params });
      
      if (response.data.Response === 'True') {
        return {
          movies: response.data.Search || [],
          totalResults: parseInt(response.data.totalResults) || 0
        };
      } else {
        return rejectWithValue(response.data.Error || 'No results found');
      }
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue('Failed to fetch movies. Please try again later.');
    }
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalPages: 0,
    filters: {
      year: '',
      type: 'movie',
      showFilters: false
    }
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateFilter: (state, action) => {
      state.filters = {
        ...state.filters,
        [action.payload.name]: action.payload.value
      };
      state.currentPage = 1;
    },
    toggleFilters: (state) => {
      state.filters.showFilters = !state.filters.showFilters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalPages = Math.ceil(action.payload.totalResults / 10); // OMDb returns 10 results per page
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.movies = [];
        state.totalPages = 0;
      });
  }
});

export const { setSearchQuery, setPage, updateFilter, toggleFilters } = movieSlice.actions;
export default movieSlice.reducer;