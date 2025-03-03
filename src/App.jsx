import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WeatherPage from './pages/WeatherPage';
import DogPage from './pages/DogPage';
import MoviePage from './pages/MoviePage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-800">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/dogs" element={<DogPage />} />
            <Route path="/movies" element={<MoviePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;