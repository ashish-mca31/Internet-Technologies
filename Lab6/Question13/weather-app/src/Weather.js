import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";

const API_KEY = "4c975ae4146e1346ca92ca94c54c8287";

function Weather() {

  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {

    try {

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error("City not found");
      }

      setWeather(data);
      setError("");

    } catch (err) {

      setError("City not found");
      setWeather(null);

    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {error && <p style={{color:"red"}}>{error}</p>}

      {weather && (
        <div className="weather-box">

          <h2>{weather.name}</h2>

          <p>Temperature: {weather.main.temp} °C</p>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>Condition: {weather.weather[0].description}</p>

          <Forecast city={weather.name} />

        </div>
      )}

    </div>
  );
}

export default Weather;