import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dog } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { 
  fetchBreeds, 
  fetchBreedImages, 
  filterBreeds, 
  selectBreed, 
  setPage 
} from '../store/slices/dogSlice';

const DogPage = () => {
  const dispatch = useDispatch();
  const { 
    breeds, 
    filteredBreeds, 
    selectedBreed, 
    images, 
    loading, 
    error, 
    currentPage, 
    imagesPerPage, 
    totalPages 
  } = useSelector(state => state.dog);
  
  // Fetch all dog breeds
  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);
  
  // Fetch images when breed changes
  useEffect(() => {
    if (selectedBreed) {
      dispatch(fetchBreedImages(selectedBreed));
    }
  }, [selectedBreed, dispatch]);
  
  // Filter breeds based on search
  const handleSearch = (query) => {
    dispatch(filterBreeds(query));
  };
  
  // Handle breed selection
  const handleBreedSelect = (breed) => {
    dispatch(selectBreed(breed));
  };
  
  // Get current images for pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  
  // Change page
  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-300 mb-2">Dog API</h1>
        <p className="text-gray-600">
          Browse dog images by breed with pagination and filtering
        </p>
      </div>

      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search for a dog breed..." 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-3 flex items-center">
            <Dog className="h-5 w-5 mr-2 text-amber-600" />
            Dog Breeds
          </h2>
          
          {loading && breeds.length === 0 ? (
            <Loader />
          ) : (
            <div className="max-h-[500px] overflow-y-auto">
              <ul className="space-y-1">
                {filteredBreeds.map(breed => (
                  <li key={breed}>
                    <button
                      onClick={() => handleBreedSelect(breed)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedBreed === breed
                          ? 'bg-amber-100 text-amber-800 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {breed.charAt(0).toUpperCase() + breed.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
              
              {filteredBreeds.length === 0 && (
                <p className="text-gray-500 text-center py-4">No breeds found matching your search.</p>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-3">
          {loading && <Loader />}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          {!loading && !error && selectedBreed && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {selectedBreed.charAt(0).toUpperCase() + selectedBreed.slice(1)} Images
              </h2>
              
              {currentImages.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentImages.map((image, index) => (
                      <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${selectedBreed} dog`} 
                          className="w-full h-64 object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <p className="text-gray-600">No images found for this breed.</p>
              )}
            </>
          )}
          
          {!loading && !error && !selectedBreed && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-6 py-8 rounded-lg text-center">
              <Dog className="h-12 w-12 mx-auto mb-4 text-amber-500" />
              <h3 className="text-lg font-semibold mb-2">No Breed Selected</h3>
              <p>Select a dog breed from the list to view images.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DogPage;