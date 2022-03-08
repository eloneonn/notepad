import axios from 'axios'
const baseUrl = '/api/userprefs'

export const updatePrefs = async (prefs, id) => {
    const request = {prefs, id}

    try {
      return await axios.put(baseUrl, request)
    } catch (error) {
      return error.response
    }
  }