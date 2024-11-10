import axios, { AxiosInstance } from 'axios'

// configura a url base da api e o tempo limite de requisiçoes
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000, // tempo limite em milissegundos
  headers: {
    'Content-Type': 'application/json', // tipo de conteudo padrao
  },
})

export default api
