import axios from 'axios';
import { config } from './tokenService';
const baseUrl = '/api/userprefs';

export const updatePrefs = async (prefs, id) => {
  const request = { prefs, id };

  try {
    await axios.put(baseUrl, request, config());
  } catch (error) {
    return error.response;
  }

  // UPDATE PREFERENCES LOCALLY AS WELL TO ENSURE CHANGES PERSIST ON REFRESH

  const user = JSON.parse(window.localStorage.getItem('loggedUser'));
  const newUser = {
    ...user,
    darkmode: prefs.darkmode,
    sorter: prefs.sorter,
    autosave: prefs.autosave
  };

  window.localStorage.setItem('loggedUser', JSON.stringify(newUser));
};
