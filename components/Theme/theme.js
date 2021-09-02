import { createTheme } from '@material-ui/core/styles'

export const dark = createTheme({
  palette: {
    type: 'dark',
    divider: 'rgba(145, 158, 171, 0.24)',
    background: {
      default: '#171c24',
      paper: '#222b36',
    },
    primary: {
      contrastText: '#ffffff',
      main: '#004d40',
    },
    secondary: {
      contrastText: '#ffffff',
      main: '#004d40',
    },
    text: {
      primary: '#ffffff',
      secondary: '#919eab',
    },
  },
});

export const light = createTheme({
  palette: {
    type: 'light',
  },
});
