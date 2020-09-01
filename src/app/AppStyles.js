import { createMuiTheme, makeStyles } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#C40316"
    },
    secondary: {
      main: "#FF7B31"
    }
  }
});


export const useStyles = makeStyles(theme => ({
  mainRoot: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    }
  }
}));
