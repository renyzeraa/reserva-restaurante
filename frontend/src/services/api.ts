import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1', // ajuste conforme sua API
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
