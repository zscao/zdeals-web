import { fade } from '@material-ui/core/styles'

export const styles = theme => ({
  search: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  searchButton: {
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.warning.light,
    '&:hover': {
      backgroundColor: fade(theme.palette.warning.main, 1),
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    }
  },
  select: {
    paddingLeft: theme.spacing(1),
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderRight: '1px solid #cdcdcd',
    fontSize: '1.0em',
    backgroundColor: '#f3f3f3',
    '&:hover': {
      backgroundColor: fade('#dadada', 1),
    },
  },
  inputRoot: {
    paddingLeft: theme.spacing(1),
    flexGrow: 1,
  },
  inputInput: {
  },
})