import React from 'react'
import {withFormValue, ErrorList} from 'react-forms'

import DatePicker from 'md-date-time-picker/dist/js/mdDateTimePicker'
import autoBind from 'react-autobind'
import Moment from 'moment'

import './DateField.css'

class DatepickerField extends React.Component {
  constructor (props) {
    super(props)

    autoBind(this)
  }

  componentDidMount () {
    this.refs.field.addEventListener('onOk', this.onOk)

    const dialog = new DatePicker({
      type: 'date',
      trigger: document.getElementById(this.props.select)
    })
    dialog.toggle.bind(dialog)

    this.setState({dialog})
  }

  componentDidUpdate () {
        // default form value fix form react-forms
    if (this.props.formValue.value === undefined) {
      if (this.refs.field && this.refs.field.parentNode.MaterialTextfield) {
        this.refs.field.parentNode.MaterialTextfield.change(new Moment().format('L'))
        if (this.props.formValue.errorList.length > 0) {
          this.refs.field.parentNode.classList.add('is-invalid')
        }
      }
    }

    if (this.state.dialog) {
      // eslint-disable-next-line
      this.state.dialog.time = this.props.formValue.value ? new Moment(this.props.formValue.value, 'L') : new Moment()
    }

        // always dirty b.c. of mdl issues with time/date inputs
    if (this.refs.field && this.refs.field.parentNode.MaterialTextfield) {
      this.refs.field.parentNode.classList.add('is-dirty')
    }
  }

  render () {
    const classes = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label ' + (this.props.formValue.errorList.length ? 'is-invalid' : '')

    return (
      <div className={classes}>
        <input id={this.props.select} className='mdl-textfield__input' readOnly='true' ref='field' type='text' value={this.props.formValue.value} onFocus={this.onToggle} onChange={this.onChange} />
        <label className='mdl-textfield__label'>{this.props.label}</label>
        <ErrorList className='mdl-textfield__error' formValue={this.props.formValue} />
      </div>
    )
  }

  onToggle = () => this.state.dialog.toggle();
  onOk = () => this.props.formValue.update(this.state.dialog.time.format('L'))
  onChange = (e) => this.props.formValue.update(e.target.value)
}

export default withFormValue(DatepickerField)
