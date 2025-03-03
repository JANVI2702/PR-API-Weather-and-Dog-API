import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cloud, CloudRain, Thermometer, Wind, Droplets, Sun } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { fetchWeather } from '../store/slices/weatherSlice';

const WeatherPage = () => {
  const dispatch = useDispatch();
  const { data: weather, loading, error } = useSelector(state => state.weather);

  const handleSearch = (city) => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01': <Sun className="h-16 w-16 text-yellow-500" />,
      '02': <Cloud className="h-16 w-16 text-gray-400" />,
      '03': <Cloud className="h-16 w-16 text-gray-500" />,
      '04': <Cloud className="h-16 w-16 text-gray-600" />,
      '09': <CloudRain className="h-16 w-16 text-blue-400" />,
      '10': <CloudRain className="h-16 w-16 text-blue-500" />,
      '11': <CloudRain className="h-16 w-16 text-purple-500" />,
      '13': <CloudRain className="h-16 w-16 text-blue-200" />,
      '50': <Cloud className="h-16 w-16 text-gray-300" />
    };
    
    return iconMap[iconCode.substring(0, 2)] || <Cloud className="h-16 w-16 text-gray-400" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-300 mb-2">Weather API</h1>
        <p className="text-slate-600">
          Search for current weather conditions in any city around the world
        </p>
      </div>

      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Enter city name (e.g., London, Tokyo, New York)" 
      />

      {loading && <Loader />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {weather && !loading && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-stone-500 to-stone-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="text-white text-sm">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                {weather.weather[0] && getWeatherIcon(weather.weather[0].icon)}
                <div className="ml-4">
                  <div className="text-4xl font-bold text-gray-800">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div className="text-gray-600 capitalize">
                    {weather.weather[0]?.description}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Feels Like</div>
                    <div className="font-medium">{Math.round(weather.main.feels_like)}°C</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Humidity</div>
                    <div className="font-medium">{weather.main.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wind className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Wind</div>
                    <div className="font-medium">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Cloud className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Cloudiness</div>
                    <div className="font-medium">{weather.clouds.all}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Min Temp</div>
                  <div className="font-medium">{Math.round(weather.main.temp_min)}°C</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Max Temp</div>
                  <div className="font-medium">{Math.round(weather.main.temp_max)}°C</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Pressure</div>
                  <div className="font-medium">{weather.main.pressure} hPa</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Visibility</div>
                  <div className="font-medium">{(weather.visibility / 1000).toFixed(1)} km</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && !error && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-8 rounded-lg text-center">
          <Cloud className="h-12 w-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-lg font-semibold mb-2">No Weather Data</h3>
          <p>Enter a city name in the search bar above to get current weather information.</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;