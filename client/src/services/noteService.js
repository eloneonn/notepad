import axios from 'axios';
import { config } from './tokenService';

const baseUrl = 'api/notes';

//? KAIKKI ASYNC/AWAITIKSI?

const getAll = async () => {
  return await axios.get(baseUrl, config());
};

const create = async (newObject) => {
  return await axios.post(baseUrl, newObject, config());
};

const update = async (newObject) => {
  return await axios.put(baseUrl, newObject, config());
};

const remove = (noteId) => {
  return axios.delete(baseUrl, { headers: config().headers, params: noteId });
};

const exportedObject = { getAll, create, update, remove };

export default exportedObject;
