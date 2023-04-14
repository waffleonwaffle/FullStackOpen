import axios from 'axios'

const baseURL = 'https://restcountries.com/v3.1/all'

const getAllCountries = () => {
    const request = axios.get(baseURL)
    const countryList = request.then(response => response.data)
    return countryList
}

export default {getAllCountries}