import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountry = (searchstr) => {
    return  axios.get(`${baseUrl}/name/${searchstr}`)
}

const getAll = () => {
    return  axios.get(`${baseUrl}/all`)
}

export default {getAll, getCountry}
