import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Drawer, Box, IconButton, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { styles } from './NavBarStyles'
import { withStyles } from '@material-ui/core/styles'

import * as uiActions from '../../state/ducks/ui/actions'

function NavBar({showNavBar, toggleNavBar, categories, history, classes}) {

  const gotoCategory = category => {
    toggleNavBar();

    const search = `/deals?c=${category}`
    history.push(search)
  }

  if(!Array.isArray(categories)) categories = [];

  return (
    <Drawer anchor="left" open={showNavBar} onClose={toggleNavBar} classes={{paper: classes.container}}>
      <Box className={classes.topbar}>
        <IconButton aria-label="close" onClick={toggleNavBar}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box className={classes.list}>      
        <List>
          <ListItem disabled>
            <ListItemText primary="SEARCH BY CATEGORY" />
          </ListItem>
          {categories.map(x => (
            <ListItem key={x.code} button onClick={() => gotoCategory(x.code)}>
              <ListItemText primary={'--'.repeat(x.path.length - 1) + x.title} />
            </ListItem>
          ))}
          <Divider />
          <ListItem disabled>
            <ListItemText primary="HELP & SETTINGS" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

const mapStateToProps = state =>  ({
  showNavBar: state.ui.showNavBar,
  categories: state.categories.list.result,
})

const mapDispatchToProps = {
  toggleNavBar: uiActions.toggleNavBar
}

const styled = withStyles(styles)(NavBar)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(styled))