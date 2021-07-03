  
import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: process.env.REACT_APP_API_KEY,
          query: city,
        }
      })
      .then(response => {
          setWeather(response.data);
      })
    }, [city]);
  

  if (weather && weather.current) {
    return (
      <div>
        <h1>Weather in {city}</h1>
        <div>
          <strong>temperature:</strong> {weather.current.temperature} Celsius
        </div>
        <img src={weather.current.weather_icons[0]} alt="weather" />
        <div>
          <strong>wind:</strong> {weather.current.wind_speed} km/h direction{" "}
          {weather.current.wind_dir}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Weather;