import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, } from "@mui/material";
import { styled, } from '@mui/material/styles';
import ButtonAppBar from './components/ButtonAppBar'
import NoteMasonry from "./components/NoteMasonry";
import LoginScreen from "./components/LoginScreen";
import { initializeUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import SignupScreen from './components/SignupScreen';
import NoteView from './components/NoteView';
import { useMatch } from 'react-router'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notes = useSelector(state => state.notes)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);

  const AppRoot = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  }));

  const noteMatch = useMatch('/notes/:id')

  const noteToShow = noteMatch
    ? notes.find(n => n.id === Number(noteMatch.params.id))
    : null

  if (user === null) {
    return (
      <AppRoot>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='signup' element={<SignupScreen />} />
        </Routes>
      </AppRoot>
    )
  } else {
    return (
      <Routes>
        <Route path='/' element={
          <AppRoot>
            <ButtonAppBar />
            <Container sx={{ paddingLeft: '0px', paddingRight: '0px', my: '4em'}}>
              <NoteMasonry />
            </Container>
          </AppRoot>
        }/>
        <Route path='notes/:id' element={<NoteView note={noteToShow}/>}/>
      </Routes>
    )
  }
}

export default App;