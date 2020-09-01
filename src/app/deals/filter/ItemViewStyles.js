import { fade, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  item: {
    paddingLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: fade('#f3f3f3', 1),
    }
  },
  checkbox: {
    padding: '2px',
  }

}))