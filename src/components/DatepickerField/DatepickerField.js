import React from 'react'
import {withFormValue, ErrorList} from 'react-forms'

import DatePicker from 'md-date-time-picker/dist/js/mdDateTimePicker'
import autoBind from 'react-autobind'

import './Datepicker.css'

class DatepickerField extends React.Component {
  constructor (props) {
    super(props)
    let {formValue} = this.props

    autoBind(this)

    this.state = {
      isError: formValue.errorList.length > 0,
      dialog: new DatePicker({
        type: 'date'
      })
    }
  }

  componentDidMount () {
    this.state.dialog.trigger = document.getElementById(this.props.select)
    this.refs.date.addEventListener('onOk', this.onOk)
    this.state.dialog.toggle.bind(this.state.dialog)
  }

  render () {
    const classes = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label ' + (this.state.isError ? 'is-invalid' : '')

    return (
      <div className={classes}>
        <input id={this.props.select} className='mdl-textfield__input' readOnly='true' ref='date' type='text' value={this.props.formValue.value} onFocus={this.onToggle} onChange={this.onChange} />
        <label className='mdl-textfield__label'>{this.props.label}</label>
        <ErrorList className='mdl-textfield__error' formValue={this.state.value} />
      </div>
    )
  }

  onToggle = () => this.state.dialog.toggle();

  onOk () {
    this.refs.date.parentNode.classList.add('is-dirty')
    this.props.formValue.update(this.state.dialog.time.format('L'))
  }

  onChange = (e) => this.props.formValue.update(e.target.value)
}

export default withFormValue(DatepickerField)
