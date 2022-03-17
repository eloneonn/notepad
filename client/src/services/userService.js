import axios from 'axios';
const baseUrl = '/api/users';

export const createUser = async (user) => {
  try {
    const newUser = { ...user };
    return await axios.post(baseUrl, newUser);
  } catch (error) {
    return error.response;
  }
};
