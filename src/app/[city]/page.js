"use client";

import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../../redux/features/weatherSlice";
import { useEffect, use } from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa"; // Location icon

export default function CityWeatherPage({ params }) {
  const { city } = use(params);

  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    if (city) {
      dispatch(getWeather(city));
    }
  }, [city, dispatch]);

  if (!city) {
    return <div className="text-white text-center text-lg">Please enter a city to get the weather information.</div>;
  }

  if (weather.loading) {
    return <div className="text-white text-center text-lg">Loading weather data...</div>;
  }

  if (!weather.data || weather.error) {
    return <div className="text-white text-center text-lg">Error fetching weather data.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-cover bg-center p-8" style={{ backgroundImage: "url('../assets/weather-bg.jpg')", backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-5 left-5 bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-md shadow-md hover:bg-black/70 transition backdrop-blur-md"
      >
        ← Back
      </button>

      {/* Main Weather Info Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid gap-1 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">

        {/* Card 1: City Name and Location */}
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-lg text-white text-center w-[300px] h-[280px] mx-auto flex flex-col justify-center items-center">
          <FaMapMarkerAlt className="text-5xl mb-2" /> {/* Larger, centered Location Icon */}
          <div>
            <h1 className="text-4xl font-bold">{city}</h1> {/* Large City Name */}
            <p className="text-lg capitalize font-light">{weather.data.weather[0].description}</p> {/* Weather Description */}
          </div>
        </div>

        {/* Card 2: Weather Icon and Temperature */}
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-lg text-white text-center w-[300px] h-[280px] mx-auto flex flex-col justify-center items-center">
          <div className="mb-3 relative w-full h-full">
            {/* Weather Icon */}
            <Image
              src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-5xl font-extrabold">{weather.data.main.temp}°C</p>
          <p className="text-sm capitalize font-light">{weather.data.weather[0].description}</p>
        </div>

        {/* Card 3: Additional Details (Wind, Pressure, etc.) */}
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-lg text-white text-center w-[300px] h-[280px] mx-auto">
          <h2 className="text-2xl font-bold mb-3">Additional Details</h2>
          <div className="space-y-2">
            <p><strong className="font-semibold">Feels Like:</strong> {weather.data.main.feels_like}°C</p>
            <p><strong className="font-semibold">Humidity:</strong> {weather.data.main.humidity}%</p>
            <p><strong className="font-semibold">Wind Speed:</strong> {weather.data.wind.speed} m/s</p>
            <p><strong className="font-semibold">Pressure:</strong> {weather.data.main.pressure} hPa</p>
            <p><strong className="font-semibold">Visibility:</strong> {weather.data.visibility / 1000} km</p>
          </div>
        </div>

        {/* Card 4: Min and Max Temperatures */}
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-lg text-white text-center w-[300px] h-[280px] mx-auto">
          <h2 className="text-2xl font-bold mb-3">Min and Max Temperatures</h2>
          <div className="space-y-2">
            <p><strong className="font-semibold">Min Temperature:</strong> {weather.data.main.tempMin}°C</p>
            <p><strong className="font-semibold">Max Temperature:</strong> {weather.data.main.tempMax}°C</p>
          </div>
        </div>

      </div>
    </div>
  );
}
