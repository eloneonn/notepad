import axios from 'axios';
import { config } from './tokenService';
const baseUrl = '/api/users';

export const createUser = async (user) => {
  try {
    const newUser = { ...user };
    return await axios.post(baseUrl, newUser);
  } catch (error) {
    return error.response;
  }
};

export const putUser = async (newUser) => {
  try {
    return await axios.put(baseUrl, newUser, config());
  } catch (error) {
    return error.response;
  }
};

export const putPassword = async (oldPassword, newPassword) => {
  try {
    return await axios.put(`${baseUrl}/password`, { oldPassword, newPassword }, config());
  } catch (error) {
    return error.response;
  }
};

export const deleteUser = async (password) => {
  try {
    return await axios.delete(baseUrl, { headers: config().headers, params: { password } });
  } catch (error) {
    return error.response;
  }
};
