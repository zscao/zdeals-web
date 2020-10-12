import { createMuiTheme, makeStyles } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      //main: "#C40316"
      //main: "#7C0707"
      //main: '#940F04'
      //main: '#D11E00'
      main: '#AB2623'
      //main: '#232F3E'
      //main: '#771A18'
    },
    secondary: {
      //main: "#FF7B31"
      //main: '#E9AA03'
      main: '#F8C002'
    },
    info: {
      main: '#048BF3'
    },
    success: {
      main: '#0FAC35'
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
    minHeight: 'calc(100vh - 50px)',
    backgroundColor: '#fff',
  }
}));
