import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiMasonry: {
      styleOverrides: {
        root: {
            margin: '0'
        }
      },
    },
}

});

export default theme;
