import React from 'react'
import './Button.css'
import autoBind from 'react-autobind'
import 'material-design-lite/src/button/button'
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
  static propTypes = {
    invoke: PropTypes.func,
    context: PropTypes.any,
    classes: PropTypes.string,
    icon: PropTypes.string
  }

  constructor (props) {
    super(props)

    autoBind(this)
  }

  onClick () {
    this.props.invoke(this.props.context)
  }

  render () {
    const classes = 'mdl-button mdl-js-button mdl-js-ripple-effect ' + (this.props.classes || '')

    return (
      <button disabled={!this.props.invoke} className={classes} onClick={this.onClick}>
        <i className='material-icons'>{ this.props.icon }</i>
      </button>
    )
  }
}

export default Button
