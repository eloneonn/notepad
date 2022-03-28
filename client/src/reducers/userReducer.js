import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/loginService';
import { putUser, putPassword, deleteUser } from '../services/userService';
import { initializeColorMode, setColorMode } from './colorModeReducer';
import { clearNotes } from './noteReducer';
import { setNotification } from './notificationReducer';
import { clearRecordings } from './recordingReducer';
import { setSorter } from './sorterReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    }
  }
});

export const login = (user) => {
  return async (dispatch) => {
    try {
      const resultedUser = await loginService.login({ ...user });
      if (resultedUser) {
        window.localStorage.setItem('loggedUser', JSON.stringify(resultedUser));

        dispatch(setNotification('success', 'Login succesful!'));
        dispatch(setUser(resultedUser));
        dispatch(setSorter(resultedUser.sorter));
        dispatch(initializeColorMode());
      }
    } catch (error) {
      dispatch(setNotification('error', 'Wrong email or password'));
      return error.toJSON();
    }
    return { status: 200 };
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch(setUser(null));
    dispatch(setNotification('info', 'Logged out!'));
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      dispatch(setSorter(user.sorter));
      dispatch(initializeColorMode());
    }
  };
};

export const updateUser = (user, password) => {
  return async (dispatch) => {
    const res = await putUser(user, password);

    if (res.status === 200) {
      dispatch(setNotification('success', 'Account information saved!'));
      dispatch(setUser(user));
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
    } else {
      dispatch(setNotification('error', res.statusText));
    }
  };
};

export const updatePassword = (oldPassword, newPassword) => {
  return async (dispatch) => {
    const res = await putPassword(oldPassword, newPassword);

    if (res.status === 200) {
      dispatch(logout());
      dispatch(clearNotes());
      dispatch(setColorMode('light'));
      dispatch(setNotification('success', 'Password changed!'));

      return res.status;
    } else {
      dispatch(setNotification('error', res.statusText));
    }
  };
};

export const removeUser = (password) => {
  return async (dispatch) => {
    const res = await deleteUser(password);

    if (res.status === 204) {
      dispatch(clearNotes());
      dispatch(clearRecordings());
      dispatch(clearUser());
      dispatch(logout());
      dispatch(setColorMode('light'));
      dispatch(setNotification('success', 'Account deleted!'));
    } else {
      dispatch(setNotification('error', 'something went wrong'));
    }
  };
};

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
