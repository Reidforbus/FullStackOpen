import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5'

const apiKey = import.meta.env.VITE_OWM_API_KEY

const getWeather = (lat, long) => {
    return  axios.get(`${baseUrl}/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
}

export default {getWeather}
