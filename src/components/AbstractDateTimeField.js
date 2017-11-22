import React from 'react'
import 'material-design-lite/src/textfield/textfield'
import autoBind from 'react-autobind'
import Moment from 'moment'
import PropTypes from 'prop-types';

class AbstractDateTimeField extends React.Component {
  static propTypes = {
    formValue: PropTypes.object.isRequired,
    label: PropTypes.string,
    select: PropTypes.string.isRequired
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

    return new Moment()
  }

  static time (value) {
    return AbstractDateTimeField.moment(value, 'HH:mm')
  }

  static date (value) {
    return AbstractDateTimeField.moment(value, 'L')
  }

  createPicker () {}
  updateDialogDate () {}
  updateMaterialDate () {}

  componentDidMount () {
    if (this.field) {
      this.field.addEventListener('onOk', this.onOk)
    }
    if (typeof document !== 'undefined') {
      const dialog = this.state.dialog
      dialog.trigger = document.getElementById(this.props.select)
      dialog.toggle.bind(dialog)
    }
  }

  componentDidUpdate () {
        // default form value fix form react-forms
    if (this.props.formValue.value === undefined && this.field) {
      this.resetValue()
    }

    this.updateDialogDate()

        // always dirty b.c. of mdl issues with time/date inputs
    if (this.field) {
      this.markDirty()
    }
  }

  markDirty () {
    this.field.parentNode.classList.add('is-dirty')
  }

  resetValue () {
    if (this.props.formValue.errorList.length > 0) {
      this.field.parentNode.classList.add('is-invalid')
    }

    if (this.field.parentNode.MaterialTextfield) {
      this.updateMaterialDate()
    }
  }

  onClose = () => this.state.dialog.hide()
  onToggle = () => this.state.dialog.toggle();
  onChange = (e) => this.props.formValue.update(e.target.value)
}

export default AbstractDateTimeField
