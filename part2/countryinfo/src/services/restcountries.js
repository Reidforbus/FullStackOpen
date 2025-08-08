import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const get = (searchstr) => {
    const request = axios.get(`${baseUrl}/name/${searchstr}`)
    return request.then(response => response.data)
}

export default {get}
