import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Note from './Note';
import Masonry from '@mui/lab/Masonry';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import CreateButton from './CreateButton';
import { appendNote, newNote } from '../reducers/noteReducer';
import { v4 as uuidv4 } from 'uuid';

const NoteMasonry = () => {
  const filter = useSelector((state) => state.filter);
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const refs = useRef([]);

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(filter.toLowerCase()) ||
      n.content.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreate = async () => {
    const id = uuidv4();

    const newNoteObj = {
      id: id,
      title: '',
      content: ''
    };

    await dispatch(appendNote(newNoteObj));
    refs.current[0].setModalView(true);

    dispatch(newNote(newNoteObj));
  };

  return (
    <Box key="masonry-box">
      {notes.length === 0 ? (
        <Container
          sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography sx={{ opacity: '60%' }}>You haven't created any notes yet</Typography>
          <Typography sx={{ opacity: '60%' }}>Use the button below</Typography>
        </Container>
      ) : (
        <div>
          <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={1} key="masonry">
            {filteredNotes.map((note, i) => (
              <Note key={note.id} note={note} ref={(element) => (refs.current[i] = element)} />
            ))}
          </Masonry>
          {filteredNotes.length === 0 ? (
            <Container
              sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography sx={{ opacity: '60%' }}>0 notes found</Typography>
            </Container>
          ) : null}
        </div>
      )}
      <CreateButton type="createnote" handler={handleCreate} />
    </Box>
  );
};

export default NoteMasonry;
