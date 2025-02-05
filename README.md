SkyCast Weather App

SkyCast is a simple and interactive weather forecasting web application. It allows users to check real-time weather conditions for different cities, including temperature, weather icons, and more. Built using Next.js, Redux, and OpenWeather API, this app delivers accurate and responsive weather updates.

Features

✅ Search weather for any city.
✅ Displays current temperature and weather conditions.
✅ Shows an error message for invalid cities instead of redirecting.
✅ Beautiful UI with a dynamic background.
✅ Pre-loaded weather data for some major cities.

Tech Stack

Frontend: Next.js, React

State Management: Redux Toolkit

API: OpenWeatherMap

Styling: Tailwind CSS

Installation & Setup

1. Clone the Repository

git clone https://github.com/your-username/skycast.git
cd skycast

2. Install Dependencies
npm install

3. Set Up Environment Variables

Create a .env.local file in the root directory and add your OpenWeather API key:
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here

4. Run the Application
npm run dev
Usage

Search for a City - Enter a city name and click the Search button.

Check Weather Details - If the city is valid, you'll be redirected to its weather page.

Error Handling - If the city is invalid, an error message will be displayed instead of redirecting.

Contributors

Developed by Hibst Getachew

Contact hibstgetachew5@gmail.com
