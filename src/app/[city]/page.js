"use client";

import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../../redux/features/weatherSlice"; 
import { useEffect } from "react";
import Image from "next/image";
import { use } from "react"; // Importing `use` to unwrap the `params`

export default function CityWeatherPage({ params }) {
  // Unwrap `params` to access the `city` parameter
  const { city } = use(params); // Use `use()` to unwrap the promise

  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    if (city) {
      dispatch(getWeather(city)); // Fetch the weather for the city
    }
  }, [city, dispatch]);

  if (!city) {
    return <div>Please enter a city to get the weather information.</div>;
  }

  // Check if weather data is loading or if there is an error
  if (weather.loading) {
    return <div>Loading weather data...</div>;
  }

  // Handle case when there is no weather data or an error in the response
  if (!weather.data || weather.error) {
    return <div>Error fetching weather data.</div>;
  }

  return (
    <div>
      <h1>{`Weather in ${city}`}</h1>
      
      {/* Detailed weather information */}
      <div>
        <p><strong>Temperature:</strong> {weather.data.main.temp}°C</p>
        <p><strong>Humidity:</strong> {weather.data.main.humidity}%</p>
        <p><strong>Condition:</strong> {weather.data.weather[0].description}</p>
        <p><strong>Wind Speed:</strong> {weather.data.wind.speed} m/s</p>

        {/* Weather icon */}
        <Image
          src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
          alt={weather.data.weather[0].description}
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
