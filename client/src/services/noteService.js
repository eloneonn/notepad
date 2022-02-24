import axios from 'axios'
import tokenService from './tokenService'

const baseUrl = '/api/notes'

//? KAIKKI ASYNC/AWAITIKSI?

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${tokenService.getToken()}`,
    },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, config())
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = (id, newObject) => { //!NOT DONE
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => { //!NOT DONE
  return axios.delete(`${baseUrl}/${id}`, config())
}

const exportedObject = { getAll, create, update, remove }

export default exportedObject