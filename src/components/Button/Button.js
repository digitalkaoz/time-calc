import React from 'react'
// import './Button.css'
// import 'material-design-lite/src/button/button'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

const GenericButton = ({ invoke, context, classes, icon, type }) => (
  <Button
    disabled={!invoke}
    variant='raised'
    color='primary'
    className={classes}
    type={type || 'button'}
    onClick={() => type ? true : invoke(context)}
  >
    <i className='material-icons'>{icon}</i>
  </Button>
)

GenericButton.propTypes = {
  invoke: PropTypes.func,
  context: PropTypes.any,
  classes: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string
}

export default GenericButton
