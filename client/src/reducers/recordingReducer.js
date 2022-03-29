import { createSlice } from '@reduxjs/toolkit';
import recordingService from '../services/recordingsService';

const recordingSlice = createSlice({
  name: 'recordings',
  initialState: [],
  reducers: {
    setRecordings(state, action) {
      return action.payload;
    },
    appendRecording(state, action) {
      if (!state.filter((e) => e.id === action.payload.id).length > 0) {
        state.push(action.payload);
      }
    },
    deleteRecording(state, action) {
      return state.filter((e) => e.id !== action.payload.id);
    },
    deleteRecordingsOfNote(state, action) {
      return state.filter((e) => e.note_id !== action.payload);
    },
    clearRecordings(state, action) {
      return [];
    }
  }
});

export const initializeRecordings = (note_id) => {
  return async (dispatch) => {
    try {
      var res = await recordingService.getAll(note_id);
    } catch (error) {
      console.log(error);
    }

    if (res.status === 204) {
      return;
    }

    const recordings = res.data;

    recordings.forEach(async (recording) => {
      dispatch(appendRecording(recording));
    });
  };
};

export const newRecording = (newRecording) => {
  return async (dispatch) => {
    const recordingToAppend = {
      ...newRecording,
      blobURL: window.URL.createObjectURL(newRecording.blob)
    };
    delete recordingToAppend.blob;
    dispatch(appendRecording(recordingToAppend));

    try {
      await recordingService.add(newRecording);
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeRecording = (recording) => {
  return async (dispatch) => {
    try {
      recordingService.remove(recording);
    } catch (error) {
      console.log(error);
    }
    dispatch(deleteRecording(recording));
  };
};

export const removeRecordingsOfNote = (note_id) => {
  return async (dispatch) => {
    try {
      recordingService.removeAllOfNote({ data: note_id });
    } catch (error) {
      console.log(error);
    }
    dispatch(deleteRecordingsOfNote(note_id));
  };
};

export const {
  setRecordings,
  appendRecording,
  deleteRecording,
  clearRecordings,
  deleteRecordingsOfNote
} = recordingSlice.actions;
export default recordingSlice.reducer;
