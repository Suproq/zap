import { createTheme } from '@mui/material/styles';


export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
      light: '#66bb6a',
      dark: '#2e7d32',
    },
    secondary: {
        main: '#1e88e5',
        light: '#ffee58',
        dark: '#00897b'
    }
  }
})


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#222222"
    },
    primary: {
      main: '#388e3c',
      light: '#66bb6a',
      dark: '#2e7d32',
    },
    secondary: {
      main: '#1e88e5',
      light: '#ffee58',
      dark: '#00897b'
  }
  }
})

export default lightTheme;
