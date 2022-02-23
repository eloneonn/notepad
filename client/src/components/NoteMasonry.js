import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Note from './Note'
import { styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';

const NoteMasonry = () => {
  const notes = useSelector(state => state.notes)

  const StyledFab = styled(Fab)(({ theme }) => ({ //? Pitäisikö tästä tehdä oma react-komponentti?
    position: 'fixed',
    bottom: 16,
    left: '50%',
    transform: 'translate(-50%, -50%)',  
    ariaLabel: 'create note',
    color: 'secondary',
    label: 'create-note',
  }));

  return (
    <Box sx={{ maxWidth: '100%', }}>

      {notes.length === 0 ? (
        <Container sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography sx={{ opacity: '60%' }}>You haven't created any notes yet</Typography>
          <Typography sx={{ opacity: '60%' }}>Use the button below</Typography>
        </Container>
        ) : (
        <Masonry columns={2} spacing={2}>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Masonry>
      )}  


      <StyledFab >
        <EditIcon />
      </StyledFab>


    </Box>
  );
}

export default NoteMasonry
