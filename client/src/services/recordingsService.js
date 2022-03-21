import axios from 'axios';
import { config } from './tokenService';

const baseUrl = '/api/recordings';

const getAll = async (note_id) => {
  const response = await axios.get(baseUrl, {
    headers: config().headers,
    params: { id: note_id }
  });
  return response.data;
};

const add = async (newRecording) => {
  const response = await axios.post(baseUrl, newRecording, config());
  return response.data;
};

const remove = (recording) => {
  axios.delete(baseUrl, { headers: config().headers, params: recording });
};

const removeAllOfNote = (note_id) => {
  axios.delete(`${baseUrl}/multiple`, { headers: config().headers, params: note_id });
};

const exportedObject = { add, remove, getAll, removeAllOfNote };
export default exportedObject;
