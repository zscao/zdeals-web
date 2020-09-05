import { fade } from '@material-ui/core/styles'

export const styles = theme => ({
  filter: {
    marginBottom: theme.spacing(2),
  },
  item: {
    paddingLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: fade('#f3f3f3', 1),
    }
  },
  checkbox: {
    padding: '2px',
    color: theme.palette.secondary.main,
  },
  clear: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.info.main,
    }
  }

})