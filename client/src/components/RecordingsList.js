import { IconButton, List, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeRecordings, removeRecording } from '../reducers/recordingReducer';

const RecordingsList = ({ note_id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const recordingsState = useSelector((state) => state.recordings);
  const recordings = recordingsState.filter((e) => e.note_id === note_id);
  const url = 'api/recordings/audiofile?path=';

  useEffect(() => {
    dispatch(initializeRecordings(note_id));
  }, [dispatch, note_id]);

  return (
    <div>
      <Typography variant="h5" textAlign={'center'}>
        Recordings
      </Typography>
      {recordings.length > 0 ? (
        <List>
          {recordings.map((record) => (
            <ListItem
              alignItems="center"
              key={record.id}
              sx={{ alignContent: 'center', justifyContent: 'center' }}>
              <audio
                controls
                src={
                  typeof record.blobURL !== 'undefined'
                    ? record.blobURL
                    : `${url}${record.path}&token=${user.token}&user_id=${user.id}`
                }
                style={{
                  width: '100%',
                  maxWidth: '350px'
                }}></audio>
              <IconButton onClick={() => dispatch(removeRecording(record))}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography textAlign={'center'} sx={{ opacity: '75%' }}>
          this note contains no recordings
        </Typography>
      )}
    </div>
  );
};

export default RecordingsList;
