export const styles = theme => ({
  container: {
    minWidth: '240px',
    maxWidth: '340px',
    width: 'calc(100vw * 0.25)',
  },
  topbar: {
    backgroundColor: theme.palette.primary.main,
    height: '40px',
    textAlign: 'right',
    color: '#fff',
    '& button': {
      color:'#fff'
    }
  },
  list: {
    maxWidth: 'calc(100vh - 40px)',
    overflowY: 'scroll',
  }
})