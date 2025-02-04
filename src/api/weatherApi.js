const API_KEY = "ab757cbd7a4d7a2ad695e130b3b07b79"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
