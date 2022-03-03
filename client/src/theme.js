import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#022222',
    },
    secondary: {
      main: '#eaeef5',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: '0'
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '0'
        },
      },
    },
}

});

export default theme;
