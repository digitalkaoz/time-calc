import React from 'react'
import {withFormValue, ErrorList} from 'react-forms'
import 'material-design-lite/src/textfield/textfield'
import autoBind from 'react-autobind'
import DatePicker from 'md-date-time-picker/dist/js/mdDateTimePicker'
import 'draggabilly'

import './TimeField.css'

class TimeField extends React.Component {
  constructor (props) {
    super(props)
    let {formValue} = this.props

    autoBind(this)
    this.state = {
      isError: formValue.errorList.length > 0,
      dialog: new DatePicker({
        type: 'time'
                // mode: true,
      })
    }
  }

  componentDidMount () {
    this.state.dialog.trigger = document.getElementById(this.props.select)
    this.refs.time.addEventListener('onOk', this.onOk)
    this.state.dialog.toggle.bind(this.state.dialog)
  }

  render () {
    const classes = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label ' + (this.state.isError ? 'is-invalid' : '')

    return (
      <div className={classes}>
        <input className='mdl-textfield__input' type='time' onKeyUp={this.onClose} id={this.props.select} ref='time' value={this.props.formValue.value} onBlur={this.onClose} onFocus={this.onToggle} onChange={this.onChange} placeholder='HH:mm' />
        <label className='mdl-textfield__label'>{this.props.label}</label>
        <ErrorList className='mdl-textfield__error' formValue={this.state.value} />
      </div>
    )
  }

  onToggle = () => this.state.dialog.toggle()

  onClose () {
    this.state.dialog._selectDialog()

    if (DatePicker.dialog.state) {
      this.state.dialog.hide(true)
    }
  }

  onOk () {
    this.refs.time.parentNode.classList.add('is-dirty')
    this.props.formValue.update(this.state.dialog.time.format('HH:mm'))
  }

  onChange = (e) => { this.props.formValue.update(e.target.value) }
}

export default withFormValue(TimeField)
