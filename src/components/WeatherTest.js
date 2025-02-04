"use client"; 

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../redux/features/weatherSlice"; // Updated import path

const WeatherTest = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (city) dispatch(getWeather(city));
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Weather: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherTest;
