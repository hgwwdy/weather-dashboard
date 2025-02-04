const API_KEY = "ab757cbd7a4d7a2ad695e130b3b07b79"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    // Make sure the data has the required fields
    return {
      name: data.name,  // City name
      country: data.sys.country,  // Country
      main: {
        temp: data.main.temp,  // Temperature
        humidity: data.main.humidity,  // Humidity
      },
      weather: [
        {
          description: data.weather[0].description,  // Weather description
          icon: data.weather[0].icon,  // Weather icon
        },
      ],
      wind: {
        speed: data.wind.speed,  // Wind speed
      },
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { error: error.message };  // Return null in case of error
  }
};
