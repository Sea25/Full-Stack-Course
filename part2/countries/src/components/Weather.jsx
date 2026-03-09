import { useState } from "react";
import { getWeather } from "../services/weather";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  const handleShow = async () => {
    const data = await getWeather(city);
    setWeather(data);
  };

  return (
    <div>
      <button onClick={handleShow}>Show Weather</button>

      {weather && (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
