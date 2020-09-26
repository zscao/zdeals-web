import { fade } from '@material-ui/core/styles'

export const styles = theme => ({
  topbar: {
    marginTop: theme.spacing(1),
    fontSize: '0.9em',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(3),
    },    
  },
  select: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '1.0em',
    backgroundColor: '#f3f3f3',
    '&:hover': {
      backgroundColor: fade('#dadada', 1),
    },
  },
  sort: {
    paddingRight: theme.spacing(1),
    fontSize: '0.9em',
  }
})