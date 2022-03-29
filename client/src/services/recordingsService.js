import axios from 'axios';
import { config } from './tokenService';

const baseUrl = '/api/recordings';

const getAll = async (note_id) => {
  return await axios.get(baseUrl, {
    headers: config().headers,
    params: { id: note_id }
  });
};

const getFile = (path) => {
  return axios.get(`${baseUrl}/audiofile`, {
    headers: config().headers,
    params: { path }
  });
};

const add = async (newRecording) => {
  const blob = newRecording.blob;
  delete newRecording.blob;

  var formData = new FormData();

  formData.append('audiofile', blob, `${newRecording.title}.ogg`);
  formData.append('id', newRecording.id);

  const response = await axios.post(baseUrl, newRecording, config());

  await axios.post(`${baseUrl}/newfile`, formData, {
    headers: config().headers,
    params: { id: newRecording.id }
  });

  return response.data;
};
const remove = (recording) => {
  axios.delete(baseUrl, { headers: config().headers, params: recording });
};

const removeAllOfNote = (note_id) => {
  axios.delete(`${baseUrl}/multiple`, { headers: config().headers, params: note_id });
};

const exportedObject = { add, remove, getAll, removeAllOfNote, getFile };
export default exportedObject;
