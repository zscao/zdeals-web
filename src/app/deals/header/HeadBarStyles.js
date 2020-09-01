import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  menuButton: {
    [theme.breakpoints.up('sm')] : {
      marginRight: theme.spacing(2),
    }
  },
  title: {
    fontSize: '1.5em',
    [theme.breakpoints.up('md')]: {
      minWidth: 160,
    },
  },
  actionSection: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      maxWidth: 120,
    },
  },
  searchSection: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  searchBox: {
    display: 'block',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
}))