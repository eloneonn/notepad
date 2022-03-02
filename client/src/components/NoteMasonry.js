import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Note from './Note'
import Masonry from '@mui/lab/Masonry';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import CreateButton from './CreateButton';
import { appendNote, newNote } from '../reducers/noteReducer';
import { v4 as uuidv4} from 'uuid'


const NoteMasonry = () => {
  const filter = useSelector(state => state.filter)
  const notes = useSelector(state => state.notes.filter(n => n.title.includes(filter) || n.content.includes(filter)))
  const dispatch = useDispatch()
  const refs = useRef([])

  const handleCreate = async () => {
    const id = uuidv4()

    const newNoteObj = {
        id: id,
        title: '',
        content: ''
      }

    await dispatch(appendNote(newNoteObj))
    refs.current[0].setModalView(true)

    dispatch(newNote(newNoteObj))
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
          {notes.map((note, i) => (
            <Note key={note.id} note={note} ref={(element) => refs.current[i] = element}/>
          ))}
        </Masonry>
      )}  
        <CreateButton type='createnote' handler={handleCreate} />
    </Box>
  );
}

export default NoteMasonry
