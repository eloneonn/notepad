import { Fab, Container, } from "@mui/material";
import { styled, } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

import ButtonAppBar from './components/ButtonAppBar'
import NoteMasonry from "./components/NoteMasonry";

const App = () => {
  const Root = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    height: '100vh',
    backgroundRepeat:'no-repeat',
    backgroundSize: 'cover',
    margin: 0,
    padding: 0,
  }));

  const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: 16,
    left: '50%',
    transform: 'translate(-50%, -50%)',  
    ariaLabel: 'edit',
    color: 'secondary',
    label: 'Edit',
  }));

  return (
    <Root>
      <ButtonAppBar />
      <Container sx={{ paddingLeft: '0px', paddingRight: '0px', my: '4em'}}>

        <NoteMasonry />

        <StyledFab >
            <EditIcon />
          </StyledFab>

      </Container>
    </Root>
  )
}

export default App;