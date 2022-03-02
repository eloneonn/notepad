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
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);

  const AppRoot = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  }));

  if (user === null) {
    return (
      <AppRoot>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='signup' element={<SignupScreen />} />
        </Routes>
        <Notification />
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
            <Notification />
          </AppRoot>
        }/>
      </Routes>
    )
  }
}

export default App;