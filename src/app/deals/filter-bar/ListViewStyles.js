
export const styles = theme => ({
  filters: {
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(3),
  },
  actions: {
    paddingTop: theme.spacing(1),
    paddingBottom: '5px',
    paddingRight: theme.spacing(2),
    backgroundColor: '#F3F3F3',
  },
  done: {
    cursor: 'pointer',
    color: theme.palette.info.main,
    fontWeight: 500,
    fontSize: '1.1em',
    '&:hover': {
      color: theme.palette.info.main,
    }
  }
})