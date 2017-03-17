import React from 'react'
import './Button.css'
import autoBind from 'react-autobind'
import 'material-design-lite/src/button/button'

class Button extends React.Component {
  static propTypes = {
    invoke: React.PropTypes.func,
    context: React.PropTypes.any,
    classes: React.PropTypes.string,
    icon: React.PropTypes.string
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
