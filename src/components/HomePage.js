"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../redux/features/weatherSlice";
import { useRouter } from "next/navigation"; 
import Image from "next/image";

export default function Homepage() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const [city, setCity] = useState(""); // Store user input
  const router = useRouter(); // Handle navigation

  useEffect(() => {
    dispatch(getWeather("Addis Ababa")); // Fetch Addis Ababa weather by default
  }, [dispatch]);

  // Function to handle search
  const handleSearch = () => {
    if (city.trim() !== "") {
      router.push(`/weather/${city}`);
    }
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar (Fixed for Addis Ababa) */}
      

      {/* Main Content */}
      <div className="flex-1 relative bg-cover bg-center" style={{ backgroundImage: "url('/assets/weather-bg.jpg')" }}>
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Navigation */}
        <nav className="relative flex justify-between items-center px-8 py-4 text-white">
          <h1 className="text-3xl font-bold">🌤️ SkyCast</h1>
        </nav>

        {/* Content Wrapper */}
        <div className="relative flex flex-col items-center justify-center min-h-screen text-white px-4">
          {/* Title */}
          <h1 className="text-5xl font-bold drop-shadow-md text-center">
            Forecast Your Weather
          </h1>

          {/* Search Bar */}
          <div className="flex items-center mt-6 space-x-3">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2 w-80 rounded-md bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 border border-white focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
            >
              Search
            </button>
          </div>

          {/* Bottom Section: Temperature for Other Cities */}
          <div className="relative mt-16 w-full text-center">
            <h2 className="text-2xl font-semibold">🌍 Global Temperatures</h2>
            <div className="mt-4 flex justify-center space-x-6 text-lg">
              <p>📍 London: 15°C</p>
              <p>📍 New York: 22°C</p>
              <p>📍 Tokyo: 19°C</p>
              <p>📍 Dubai: 32°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
