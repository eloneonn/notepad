import * as React from 'react';
import Box from '@mui/material/Box';
import Note from './Note'
import Masonry from '@mui/lab/Masonry';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import CreateButton from './CreateButton';
import { useNavigate } from 'react-router';
import { newNote } from '../reducers/noteReducer';

const NoteMasonry = () => {
  const notes = useSelector(state => state.notes)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCreate = () => { //? NOPEAMPI TAPA LUODA NOTEJA
    dispatch(newNote())
      .then(result => navigate(`/notes/${result.id}`))
  }

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
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={1.5}>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Masonry>
      )}  

        <CreateButton type='createnote' handler={handleCreate} />


    </Box>
  );
}

export default NoteMasonry
