import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => { // credentials is simply {username, password}
    try {
        const response = await axios.post(baseUrl, credentials)
        return response.data
    } catch (err) {
        console.log(err.message);
    }
}

const exportedObject = { login }
export default exportedObject