import React from 'react'
import { connect } from 'react-redux'

import { Box, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle';

import SearchBar from './SearchBar'

import { withStyles } from '@material-ui/core/styles'
import { styles } from './HeaderStyles'

import * as uiActions from '../../state/ducks/ui/actions'

function Header({classes, toggleNavBar}) {

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton}
            color="inherit" aria-label="menu" onClick={toggleNavBar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            FAT DEALS
          </Typography>
          
          <Box flexGrow={1} className={classes.searchSection}>
            <SearchBar />
          </Box>

          <Box display="flex" justifyContent="flex-end" className={classes.actionSection}>
            {/* <Button color="inherit">Login</Button> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
        <Box className={classes.searchBox}>
          <SearchBar />
        </Box>
      </AppBar>
    </>
  )
}

const mapStateToProps = state => ({
  showNavBar: state.ui.showNavBar
});

const mapDispatchToProps = {
  toggleNavBar: uiActions.toggleNavBar
}

const styled = withStyles(styles)(Header)
export default connect(mapStateToProps, mapDispatchToProps)(styled)