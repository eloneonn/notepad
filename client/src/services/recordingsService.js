import axios from 'axios';
import { config } from './tokenService';

const baseUrl = '/api/recordings';

const getAll = async (note_id) => {
  const response = await axios.get(baseUrl, { params: { id: note_id } }, config());
  return response.data;
};

const add = async (newRecording) => {
  const response = await axios.post(baseUrl, newRecording, config());
  return response.data;
};

const remove = (recording) => {
  axios.delete(baseUrl, recording, config());
};

const exportedObject = { add, remove, getAll };
export default exportedObject;
