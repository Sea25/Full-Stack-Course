import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

// Get all
const getAll = () => {
  return axios.get(baseUrl)
}

// Create new
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

// Delete
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// Update
const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson)
}

export default {
  getAll,
  create,
  remove,
  update
}
