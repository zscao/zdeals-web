import { fade, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  searchButton: {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.warning.light,
    '&:hover': {
      backgroundColor: fade(theme.palette.warning.main, 1),
    }
  },
  select: {
    paddingLeft: theme.spacing(1),
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderRight: '1px solid #cdcdcd',
    fontSize: '0.9em',
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
}))