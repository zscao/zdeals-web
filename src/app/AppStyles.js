import { createMuiTheme, makeStyles } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      //main: "#C40316"
      // main: "#7C0707"
      main: '#940F04'
    },
    secondary: {
      main: "#FF7B31"
    },
    background: {
      default: '#EAEDED'
    }
  }
});


export const useStyles = makeStyles(theme => ({
  mainRoot: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    }
  },
  content: {
    backgroundColor: '#fff',
  }
}));
