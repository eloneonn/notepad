/**
 *      USED FOR INTERACTING WITH LOCALSTORAGE ONLY
 */
import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

const setUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  token = user.token
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  console.log('Logged user:', loggedUserJSON);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getToken = () => token

const createUser = async (user) => {
  
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

const exportedObject = { setUser, getUser, clearUser, getToken, createUser, }
export default exportedObject