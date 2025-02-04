"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../redux/features/weatherSlice";
import Link from "next/link"; // Import Link for navigation
import Image from "next/image";

export default function Homepage() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const [city, setCity] = useState(""); // Store user input

  useEffect(() => {
    dispatch(getWeather("Addis Ababa")); // Fetch Addis Ababa weather by default
  }, [dispatch]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/weather-bg.jpg')" }}
      >
        {/* Overlay to make text visible */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-white px-4 py-10">
        {/* App Title */}
        <h1 className="text-4xl font-extrabold drop-shadow-lg">🌤️ SkyCast</h1>

        {/* Search bar */}
        <div className="flex items-center mt-6 space-x-3">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 w-80 rounded-md bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 border border-white focus:outline-none"
          />
          <Link href={`/${city}`} passHref>
            <button
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
            >
              Search
            </button>
          </Link>
        </div>

        {/* Weather data */}
        {weather.data && !weather.loading && !weather.error && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold">{weather.data.name}</h2>
            <p className="text-lg">{weather.data.main.temp}°C</p>
            <p className="text-lg">{weather.data.weather[0].description}</p>
            <p className="text-lg">Humidity: {weather.data.main.humidity}%</p>
            <p className="text-lg">Wind Speed: {weather.data.wind.speed} m/s</p>
            <Image
              src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
              alt={weather.data.weather[0].description}
              width={50}
              height={50}
            />
          </div>
        )}

        {/* Loading State */}
        {weather.loading && (
          <div className="mt-10 text-center">
            <p className="text-lg">Loading weather data...</p>
          </div>
        )}

        {/* Error Message */}
        {weather.error && (
          <div className="mt-10 text-center text-red-500">
            <p>{weather.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
