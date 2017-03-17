import React from 'react'
import 'material-design-lite/src/textfield/textfield'
import autoBind from 'react-autobind'
import Moment from 'moment'

class AbstractDateTimeField extends React.Component {
  static propTypes = {
    formValue: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    select: React.PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    autoBind(this)

    this.state = {
      dialog: this.createPicker()
    }
  }

  static moment (value, format) {
    if (value instanceof Moment) {
      return value.format(format)
    }

    if (value) {
      return new Moment(value, format)
    }

    return new Moment().format(format)
  }

  static time (value) {
    return AbstractDateTimeField.moment(value, 'HH:mm')
  }

  static date (value) {
    return AbstractDateTimeField.moment(value, 'L')
  }

  createPicker () {
  }

  updateDialogDate () {
  }

  updateMaterialDate () {
  }

  componentDidMount () {
    this.refs.field.addEventListener('onOk', this.onOk)
    if (typeof document !== 'undefined') {
      this.state.dialog.trigger = document.getElementById(this.props.select)
      this.state.dialog.toggle.bind(this.state.dialog)
    }
  }

  componentDidUpdate () {
        // default form value fix form react-forms
    if (this.props.formValue.value === undefined) {
      this.resetValue()
    }

    this.updateDialogDate()

        // always dirty b.c. of mdl issues with time/date inputs
    this.markDirty()
  }

  markDirty () {
    this.refs.field.parentNode.classList.add('is-dirty')
  }

  resetValue () {
    if (this.props.formValue.errorList.length > 0) {
      this.refs.field.parentNode.classList.add('is-invalid')
    }

    if (this.refs.field.parentNode.MaterialTextfield) {
      this.updateMaterialDate()
    }
  }

  onClose = () => this.state.dialog.hide()
  onToggle = () => this.state.dialog.toggle();
  onChange = (e) => this.props.formValue.update(e.target.value)
}

export default AbstractDateTimeField
