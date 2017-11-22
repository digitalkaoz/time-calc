import React from 'react'
import autoBind from 'react-autobind'
import './Dialog.css'
import PropTypes from 'prop-types';

export default (WrappedComponent, id) => {
  return class Dialog extends React.PureComponent {
    static propTypes = {
      onOk: PropTypes.func.isRequired
    }

    context;

    constructor (props) {
      super(props)

      autoBind(this)
    }

    onClose = () => document.getElementById(id).close()
    onOk = () => {
      if (document.getElementById(id).open) {
        document.getElementById(id).close()
      }
      this.props.onOk(this.context)
    }

    unbind (dialog) {
      dialog.getElementsByClassName('ok')[0].removeEventListener('click', this.onOk.bind(this), false)
      dialog.getElementsByClassName('cancel')[0].removeEventListener('click', this.onClose.bind(this), false)
    }

    bind (dialog) {
      dialog.getElementsByClassName('ok')[0].addEventListener('click', this.onOk.bind(this), false)
      dialog.getElementsByClassName('cancel')[0].addEventListener('click', this.onClose.bind(this), false)
    }

    toggleDialog (context) {
      this.context = context
      const dialog = document.getElementById(id)

      this.unbind(dialog)
      this.bind(dialog)

      if (dialog.open) {
        dialog.close()
      } else {
        dialog.showModal()
      }
    }

    render = () => <WrappedComponent {...this.props} toggleDialog={this.toggleDialog} />
  }
}
