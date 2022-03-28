import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, CssBaseline, useMediaQuery } from '@mui/material';
import ButtonAppBar from './components/ButtonAppBar';
import NoteMasonry from './components/NoteMasonry';
import LoginScreen from './components/LoginScreen';
import { initializeUser } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import SignupScreen from './components/SignupScreen';
import Notification from './components/Notification';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const colorMode = useSelector((state) => state.colorMode);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: colorMode,
      primary: {
        main: colorMode === 'light' ? '#000000' : '#ffffff'
      },
      secondary: {
        main: colorMode === 'light' ? '#ffffff' : '#000000'
      },
      background: {
        default: colorMode === 'light' ? '#ffffff' : '#000000'
      }
    },
    typography: {
      caption: {
        color: colorMode === 'light' ? '#000000' : '#ffffff'
      }
    },
    components: {
      MuiMasonry: {
        styleOverrides: {
          root: {
            margin: '0'
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: colorMode === 'light' ? '#000000' : '#ffffff'
          }
        }
      },
      MuiFab: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: colorMode === 'light' ? 'grey' : 'darkred'
            },
            '&.Mui-focusVisible': {
              backgroundColor: colorMode === 'light' ? 'grey' : 'darkred'
            }
          }
        }
      }
    }
  });

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {user === null ? (
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="signup" element={<SignupScreen />} />
          </Routes>
        ) : (
          <div>
            <ButtonAppBar />
            <Container
              sx={{ paddingLeft: '0px', paddingRight: '0px', py: fullScreen ? '4em' : '5em' }}>
              <NoteMasonry />
            </Container>
          </div>
        )}
        <Notification />
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
