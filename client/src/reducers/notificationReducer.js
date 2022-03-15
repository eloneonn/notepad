import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    }
  }
});

var timeoutID = '';

export const setNotification = (notification, type) => {
  return async (dispatch) => {
    dispatch(showNotification([notification, type]));
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, 4000);
  };
};

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
