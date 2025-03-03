import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cloud, Dog, Film, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-4xl text-red-500 ">API's</span>
          </div>
          <div className="flex space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive 
                  ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-100 hover:bg-zinc-700'
                }`
              }
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </NavLink>
            <NavLink 
              to="/weather" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-100 hover:bg-zinc-700'
                }`
              }
            >
              <Cloud className="mr-1 h-4 w-4" />
              Weather
            </NavLink>
            <NavLink 
              to="/dogs" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-zinc-800 text-white' 
                    : 'text-zinc-100 hover:bg-zinc-700'
                }`
              }
            >
              <Dog className="mr-1 h-4 w-4" />
              Dogs
            </NavLink>
            <NavLink 
              to="/movies" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-zinc-800 text-white' 
                    : 'text-zinc-100 hover:bg-zinc-700'
                }`
              }
            >
              <Film className="mr-1 h-4 w-4" />
              Movies
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;