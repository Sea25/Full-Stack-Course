import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const [lat, lon] = country.capitalInfo.latlng

    weatherService.getWeather(lat, lon).then(response => {
      setWeather(response.data)
    })
  }, [country])

  if (!weather) return null

  return (
    <div>
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
