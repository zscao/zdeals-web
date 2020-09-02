import { fade } from '@material-ui/core/styles'

export const styles = theme => ({
  toolbar: {
    marginTop: theme.spacing(1),
    fontSize: '0.9em',
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