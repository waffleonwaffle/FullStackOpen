import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    console.log(request)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, createPerson, deletePerson, updatePerson}
