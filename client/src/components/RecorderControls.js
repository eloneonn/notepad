import { ButtonGroup, Container, Drawer, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CreateButton from './CreateButton';
import RecordingsList from './RecordingsList';
import StopIcon from '@mui/icons-material/Stop';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useSelector } from 'react-redux';
import './styles.css';

const formatMinutes = (minutes) => {
  return minutes < 10 ? `0${minutes}` : minutes;
};

const formatSeconds = (seconds) => {
  return seconds < 10 ? `0${seconds}` : seconds;
};

const RecordingControls = ({ recorderState, handlers, note_id }) => {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording /*cancelRecording*/ } = handlers;
  const colorMode = useSelector((state) => state.colorMode);
  const [drawer, setDrawer] = useState(false);

  const handleRecord = () => {
    setDrawer(!drawer);
  };

  return (
    <Box keepMounted>
      <Drawer
        disableScrollLock
        anchor="bottom"
        open={drawer}
        onBackdropClick={() => setDrawer(false)}
        onClose={() => setDrawer(false)}
        PaperProps={{ style: { position: 'absolute' } }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: document.getElementById('note-container'),
          style: { position: 'absolute' }
        }}>
        <Container sx={{ backgroundColor: colorMode === 'light' ? '#ffffff' : '#121212' }}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="stretch">
            <Grid item xs={4}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    pt: '0.5em',
                    color: initRecording ? 'crimson' : 'primary'
                  }}>
                  {formatMinutes(recordingMinutes)}:{formatSeconds(recordingSeconds)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <ButtonGroup variant="outlined">
                  <IconButton
                    className={initRecording ? 'recording-animation' : ''}
                    size="large"
                    onClick={() => startRecording()}
                    sx={{ color: initRecording ? 'crimson' : 'primary' }}>
                    <FiberManualRecordIcon />
                  </IconButton>
                  <IconButton
                    size="large"
                    onClick={() => saveRecording()}
                    disabled={recordingSeconds === 0}>
                    <StopIcon />
                  </IconButton>
                </ButtonGroup>
              </Box>
            </Grid>
            <Grid item xs={5} sx={{ mb: '8em' }}>
              <Box>
                <RecordingsList note_id={note_id} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Drawer>
      <CreateButton type={'recordings'} handler={handleRecord} />
    </Box>
  );
};

export default RecordingControls;
