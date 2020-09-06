import { fade } from '@material-ui/core/styles'

export const styles = theme => ({
  filter: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  itemRoot: {
    marginLeft: 0,
    marginRight: theme.spacing(3),
    minWidth: '90px',
    '&:hover': {
      backgroundColor: fade('#f3f3f3', 1),
    }
  },
  itemLabel: {
    fontSize: '1.0em',
  },
  checkbox: {
    padding: '2px',
    color: theme.palette.secondary.main,
  },

})