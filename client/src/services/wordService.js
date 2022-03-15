import axios from 'axios';
const baseUrl = 'https://api.datamuse.com/words?';

const rhyme = async (word) => {
  if (word === undefined) {
    return null;
  }

  const request = await axios.get(`${baseUrl}rel_rhy=${word}`);
  return request.data;
};

const synonym = async (word) => {
  if (word === undefined) {
    return null;
  }

  const request = await axios.get(`${baseUrl}rel_syn=${word}`);
  return request.data;
};

const exportedObject = { rhyme, synonym };
export default exportedObject;
