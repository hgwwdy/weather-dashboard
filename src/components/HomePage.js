"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../redux/features/weatherSlice";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import Footer from '../components/Footer';

export default function Homepage() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const [city, setCity] = useState(""); 
  const router = useRouter(); 

  useEffect(() => {
    dispatch(getWeather("Addis Ababa")); 
  }, [dispatch]);

  // Function to get weather for a specific city
  const getCityData = (cityName) => {
    return weather.data?.main?.temp ? weather.data.main.temp : "Loading...";
  };

  // Handle search functionality
  const handleSearch = () => {
    if (city.trim() !== "") {
      router.push(`/${city}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/weather-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Logo in a standard position */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">🌤️ SkyCast</h1>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-white px-4 py-10 w-full">
        {/* Addis Ababa Weather Card */}
        <div className="bg-gray-800 bg-opacity-70 rounded-lg p-6 mt-6 w-full max-w-sm mx-auto shadow-lg shadow-gray-900 transform transition-all duration-300 hover:scale-105">
          <div className="flex flex-col items-center">
            {/* Weather Icon */}
            <Image
              src={`http://openweathermap.org/img/wn/${weather.data?.weather?.[0]?.icon}@2x.png`}
              alt={weather.data?.weather?.[0]?.description || "Weather icon"}
              width={100}
              height={100}
              className="mb-2"
            />
            {/* City & Temperature */}
            <h2 className="text-2xl font-semibold text-white">Addis Ababa</h2>
            <p className="text-4xl font-bold text-white mt-2">{getCityData("Addis Ababa")}°C</p>
          </div>
        </div>

        {/* Forecast Text and Search Section */}
        <h2 className="text-2xl font-bold text-center text-white mt-8">Forecast your weather</h2>
        <div className="flex flex-col sm:flex-row items-center mt-6 space-x-0 sm:space-x-3 space-y-3 sm:space-y-0 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 w-full rounded-md bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 border-none focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Search
          </button>
        </div>

        
        <div className="mt-20  space-y-8 text-center text-white w-full max-w-4xl">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Adama", "Harar", "Hawassa", "Gambela"].map((cityName) => (
              <div key={cityName} className="bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold">{cityName}</h4>
                <p className="text-2xl font-bold">{getCityData(cityName)}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
