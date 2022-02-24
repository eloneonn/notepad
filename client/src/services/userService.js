import axios from 'axios'
const baseUrl = '/api/users'

export const createUser = async (user) => {
  
    try {
      const newUser = {...user, type_id: 1}
  
      const response = await axios.post(baseUrl, newUser)
      console.log(response.status);
  
      if (response.status !== 201) {
        return false
      } else {
        return true
      }
    } catch (error) {
      console.log(error.message);
      return false
    }
  }