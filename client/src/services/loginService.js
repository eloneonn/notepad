import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => { // credentials is simply {username, password}
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const exportedObject = { login }
export default exportedObject