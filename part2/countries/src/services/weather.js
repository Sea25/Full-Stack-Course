import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_KEY

const getWeather = (lat, lon) => {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  return axios.get(url)
}

export default { getWeather }
