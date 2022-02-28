import axios from 'axios'
const baseUrl = '/api/users'

export const createUser = async (user) => {
  
    try {
      const newUser = {...user, type_id: 1}
      return await axios.post(baseUrl, newUser)
    } catch (error) {
      return error.response
    }
  }