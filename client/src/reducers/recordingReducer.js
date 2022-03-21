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
      if (!state.filter((e) => e.id === action.payload.id).length > 0) state.push(action.payload);
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
    const recordings = await recordingService.getAll(note_id);
    /*
    console.log(recordings);
    console.log(recordings[0].blob);
    console.log(new Blob([recordings[0].blob]));
*/
    recordings.forEach((recording) => {
      const newBlob = new Blob([recording.blob]);

      const recordingToAppend = {
        ...recording,
        blobURL: window.URL.createObjectURL(newBlob)
      };
      delete recordingToAppend.blob;
      dispatch(appendRecording(recordingToAppend));
    });
  };
};

export const newRecording = (newRecording) => {
  return async (dispatch) => {
    //    console.log(newRecording);
    //    console.log(newRecording.blob);
    try {
      await recordingService.add(newRecording);
    } catch (error) {
      console.log(error);
    }
    const recordingToAppend = {
      ...newRecording,
      blobURL: window.URL.createObjectURL(newRecording.blob)
    };
    delete recordingToAppend.blob;
    dispatch(appendRecording(recordingToAppend));
  };
};

export const removeRecording = (recording) => {
  return async (dispatch) => {
    try {
      recordingService.remove({ data: recording.id });
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
