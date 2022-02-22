import axios from 'axios'
import userService from './user'

const baseUrl = '/api/notes'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`,
    },
  }
}

const getAll = () => { //!NOT DONE
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => { //!NOT DONE
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