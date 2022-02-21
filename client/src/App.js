import { Fab, Container, } from "@mui/material";
import { styled, } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ButtonAppBar from './components/ButtonAppBar'
import NoteMasonry from "./components/NoteMasonry";
import { useSelector } from "react-redux";
import LoginScreen from "./components/LoginScreen";


const App = () => {
  const user = useSelector(state => state.user)

  const AppRoot = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  }));

  const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: 16,
    left: '50%',
    transform: 'translate(-50%, -50%)',  
    ariaLabel: 'create note',
    color: 'secondary',
    label: 'create-note',
  }));

  return (
    <div>
      {user === null 
      ? (
        <LoginScreen />
      ) : (
        <AppRoot>
          <ButtonAppBar />
          <Container sx={{ paddingLeft: '0px', paddingRight: '0px', my: '4em'}}>

            <NoteMasonry />

            <StyledFab >
              <EditIcon />
            </StyledFab>

          </Container>
        </AppRoot>
      )}
    </div>
  )
}

export default App;