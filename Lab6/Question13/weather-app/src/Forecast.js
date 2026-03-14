import React, { useState, useEffect } from "react";

const API_KEY = "4c975ae4146e1346ca92ca94c54c8287";

function Forecast({ city }) {

  const [forecast, setForecast] = useState([]);

  useEffect(() => {

    const fetchForecast = async () => {

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      const daily = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(daily.slice(0,5));
    };

    fetchForecast();

  }, [city]);

  return (
    <div>

      <h3>5 Day Forecast</h3>

      <div className="forecast">

        {forecast.map((day, index) => {

          const date = new Date(day.dt_txt).toLocaleDateString("en-GB");

          return (
            <div key={index} className="forecast-card">

              <p>{date}</p>

              <p>{day.main.temp} °C</p>

              <p>{day.weather[0].main}</p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Forecast;