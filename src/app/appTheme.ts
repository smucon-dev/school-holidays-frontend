import { createTheme } from '@mui/material'


const appTheme = createTheme({
  palette: {
    primary: {
      main: 'rgba(0, 177, 255, 0.75)',
      contrastText: 'rgba(204, 253, 255, 1)'
    },
    secondary: {
      main: 'rgba(204, 253, 255, 0.5)',
      contrastText: 'rgba(204, 253, 255, 1)'
    },
    info: {
      main: 'rgba(215, 130, 15, 1)',
    },
    error: {
      main: 'rgba(221, 113, 113, 1)'
    },
    background: {
      gradient: {
        gradientStart: 'rgba(0, 100, 140, 1)',
        gradientEnd: 'rgba(215, 130, 15, 1)',
      }
    },
    text: {
      primary: 'rgba(204, 253, 255, 1)',
      disabled: 'rgba(204, 253, 255, 0.5)',
    }
  },
  typography: {
    fontFamily: '"Indie Flower", "Raleway", "Roboto", "Helvetica", "Arial", "sans-serif"'
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'rgba(204, 253, 255, 1)',
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'rgba(204, 253, 255, 1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          pt: '1em'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'rgba(204, 253, 255, 1)',
            color: 'rgba(204, 253, 255, 1)',
          },
          '&:hover fieldset': {
            // borderColor: 'red !important',
          },
          '& .Mui-focused fieldset': {
            // borderColor: 'yellow !important',
          },
        },
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(204, 253, 255, 1)'
        }
      }
    }
  }
})

export default appTheme;