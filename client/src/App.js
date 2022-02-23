import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fab, Container, } from "@mui/material";
import { styled, } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ButtonAppBar from './components/ButtonAppBar'
import NoteMasonry from "./components/NoteMasonry";
import LoginScreen from "./components/LoginScreen";
import { initializeUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import SignupScreen from './components/SignupScreen';


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);


  const AppRoot = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  }));

  const StyledFab = styled(Fab)(({ theme }) => ({ //? Pitäisikö tästä tehdä oma react-komponentti?
    position: 'fixed',
    bottom: 16,
    left: '50%',
    transform: 'translate(-50%, -50%)',  
    ariaLabel: 'create note',
    color: 'secondary',
    label: 'create-note',
  }));

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
      <AppRoot>
        <ButtonAppBar />
        <Container sx={{ paddingLeft: '0px', paddingRight: '0px', my: '4em'}}>

          <NoteMasonry />

          <StyledFab >
            <EditIcon />
          </StyledFab>

        </Container>
      </AppRoot>
    )
  }
}

export default App;