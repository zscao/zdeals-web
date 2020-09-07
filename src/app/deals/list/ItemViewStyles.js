import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  deal: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
      borderTop: '1px solid #ebebeb',
    }
  },
  top: {
    marginBottom: theme.spacing(1),
  },
  meta: {
    fontSize: '.75em',
    color: '#999',
    '& a': {
      color: theme.palette.info.main,
      textDecoration: 'none',
      '&:hover': {
        color: '#007bff'
      }
    },
  },
  title: {
    lineHeight: '1em',
    fontSize: '1.1em',
  },
  description: {
    fontSize: '0.8em',
    color: '#212529',
    marginBottom: theme.spacing(1),
  },
  picture: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    '& > img': {
      width: '80%'
    }
  },
  price: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    fontSize: '0.9em',
    lineHeight: '1.8em',
    '& > .deal-price': {
      fontSize: '1.4em',
      fontWeight: 600,
    },
    '& del': {
      marginLeft: '5px',
      color: '#999',
    },
    '& .discount': {
      background: theme.palette.primary.main,
      color: '#fff',
      outline: 0,
      margin: '0 10px',
      padding: '2px 4px',
    },
    '& .highlight': {
      marginRight: '3px',
      fontWeight: 600,
      color: theme.palette.success.main,
    },
    '& .delivery': {
      // marginLeft: '10px',
      padding: '2px 5px',
      fontWeight: 500,
      whiteSpace:'nowrap',
      //borderRadius: '3px',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
    }
  },
  actions: {
    // textAlign: 'center',
  },
}))