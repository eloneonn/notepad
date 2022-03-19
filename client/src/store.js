import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterReducer';
import noteReducer from './reducers/noteReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import sorterReducer from './reducers/sorterReducer';
import colorModeReducer from './reducers/colorModeReducer';
import recordingReducer from './reducers/recordingReducer';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    user: userReducer,
    notification: notificationReducer,
    filter: filterReducer,
    sorter: sorterReducer,
    colorMode: colorModeReducer,
    recordings: recordingReducer
  }
});

export default store;
