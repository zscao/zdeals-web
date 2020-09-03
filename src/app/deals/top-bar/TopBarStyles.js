import { fade } from '@material-ui/core/styles'

export const styles = theme => ({
  topbar: {
    marginTop: theme.spacing(3),
    fontSize: '0.9em',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    
  },
  select: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.9em',
    backgroundColor: '#f3f3f3',
    '&:hover': {
      backgroundColor: fade('#dadada', 1),
    },
  },
  sort: {
    paddingRight: theme.spacing(1),
    fontSize: '0.8em',
  }
})