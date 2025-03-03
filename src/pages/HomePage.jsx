import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Dog, Film } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-300 mb-4">API's</h1>
        <p className="text-xl text-slate-400">
          Explore different API's with search, filtering, and pagination features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link 
          to="/weather" 
          className="bg-zinc-800 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Cloud className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-300 mb-2">Weather API</h2>
            <p className="text-slate-400 text-center">
              Search for weather information by city name and get current conditions
            </p>
          </div>
        </Link>

        <Link 
          to="/dogs" 
          className="bg-zinc-800 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-amber-100 p-4 rounded-full mb-4">
              <Dog className="h-10 w-10 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-300 mb-2">Dog API</h2>
            <p className="text-slate-400 text-center">
              Browse dog images by breed with pagination and filtering options
            </p>
          </div>
        </Link>

        <Link 
          to="/movies" 
          className="bg-zinc-800 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <Film className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-300 mb-2">Movie API</h2>
            <p className="text-slate-400 text-center">
              Search for movies, view details, and browse with advanced filtering
            </p>
          </div>
        </Link>
      </div>

     
    </div>
  );
};

export default HomePage;