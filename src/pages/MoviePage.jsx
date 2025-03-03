import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Film, Calendar, Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { 
  searchMovies, 
  setSearchQuery, 
  setPage, 
  updateFilter, 
  toggleFilters 
} from '../store/slices/movieSlice';

const MoviePage = () => {
  const dispatch = useDispatch();
  const { 
    movies, 
    loading, 
    error, 
    searchQuery, 
    currentPage, 
    totalPages, 
    filters 
  } = useSelector(state => state.movie);
  
  // Fetch movies based on search and filters
  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMovies({
        searchQuery,
        page: currentPage,
        year: filters.year,
        type: filters.type
      }));
    } else {
      // Fetch default movies (e.g., popular or trending)
      dispatch(searchMovies({
        searchQuery: "popular", // You can change this to any default query
        page: currentPage,
        year: filters.year,
        type: filters.type
      }));
    }
  }, [dispatch, searchQuery, currentPage, filters.year, filters.type]);
  
  
  // Handle search
  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilter({ name, value }));
  };
  
  // Toggle filters visibility
  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-300 mb-2">Movie API</h1>
        <p className="text-gray-600">
          Search for movies and TV shows with advanced filtering
        </p>
      </div>

      <div className="mb-6">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search for movies, TV shows, or episodes..." 
        />
      </div>

      <div className="mb-6">
        <button
          onClick={handleToggleFilters}
          className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
        >
          <Filter className="h-5 w-5 mr-2" />
          {filters.showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {filters.showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Types</option>
                  <option value="movie">Movies</option>
                  <option value="series">TV Series</option>
                  <option value="episode">Episodes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  placeholder="e.g., 2023"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && <Loader />}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map(movie => (
              <div key={movie.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="relative h-80">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <img 
                      src={movie.Poster} 
                      alt={movie.Title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Film className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white px-2 py-1 text-sm">
                    {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
                  </div>
                </div>
                
                <div className="p-4 flex-grow">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.Title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{movie.Year}</span>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-md transition-colors"
                  >
                    View on IMDb
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      
      {!loading && !error && searchQuery && movies.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-6 py-8 rounded-lg text-center">
          <Film className="h-12 w-12 mx-auto mb-4 text-gray-500" />
          <h3 className="text-lg font-semibold mb-2">No Movies Found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
      
      {!loading && !error && !searchQuery && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-lg text-center">
          <Film className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-lg font-semibold mb-2">Search for Movies</h3>
          <p>Enter a movie title in the search bar above to get started.</p>
        </div>
      )}
    </div>
  );
};

export default MoviePage;