import * as React from 'react';
import Box from '@mui/material/Box';
import Note from './Note'
import Masonry from '@mui/lab/Masonry';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import CreateButton from './CreateButton';

const NoteMasonry = () => {
  const notes = useSelector(state => state.notes)

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

        <CreateButton type='createnote' />


    </Box>
  );
}

export default NoteMasonry
