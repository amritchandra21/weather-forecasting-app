import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  const fetchWeather = async (selectedUnit = unit) => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");
      const response = await axios.get(
        `http://localhost:5000/api/weather?city=${city}&units=${selectedUnit}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    }
  };
  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    if (weatherData) {
      fetchWeather(newUnit);
    }
  };
  return (
    <div style = {{ textAlign: "center", marginTop: "50px"}}>
      <h1>Weather Forecast</h1>
      <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter City"
      />
      <button onClick={() => fetchWeather()}>Get Weather</button>

      {error && <p style={{ color: "red"}}>{error}</p>}

      {weatherData && (
        <div style={{marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", display: "inline-block" }}>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p><strong>Temperature:</strong> {weatherData.main.temp}{" "}{unit === "metric" ? "°C" : "°F"}</p>
          <p><strong>Feels Like:</strong> {weatherData.main.feels_like}{" "}{unit === "metric" ? "°C" : "°F"}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed}{" "}{unit === "metric" ? "m/s" : "mph"}</p>

          <button onClick={toggleUnit} style={{ marginTop: "10px"}}>
            Switch to {unit === "metric" ? "Fahrenheit (°F)" : "Celsius (°C)"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
