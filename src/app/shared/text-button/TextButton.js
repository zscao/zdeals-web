import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { styles } from './TextButtonStyles'

function TextButton({className, disabled, onClick, children, classes}) {

  let cls = classes.root;
  if(className) cls += ' ' + className;
  if(disabled) cls += ' disabled';

  const click = e => {
    if(disabled) return;

    if(typeof(onClick) === 'function') onClick(e);
  }

  return (
    <span className={cls} onClick={click}>{children}</span>
  )
}

const styled = withStyles(styles)(TextButton)
export default styled