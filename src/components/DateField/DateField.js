import React from 'react'
import AbstractDateTimeField from '../AbstractDateTimeField'
import {ErrorList, withFormValue} from 'react-forms'

import DatePicker from 'md-date-time-picker/dist/js/mdDateTimePicker'

import './DateField.css'

export class DatepickerField extends AbstractDateTimeField {
  static propTypes = {
    formValue: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    select: React.PropTypes.string.isRequired
  }

  createPicker () {
    return new DatePicker({
      type: 'date'
    })
  }

  updateDialogDate () {
    this.state.dialog.time = AbstractDateTimeField.date(this.props.formValue.value)
    // this.setState({dialog: {...this.state.dialog, time : AbstractDateTimeField.date(this.props.formValue.value)}});
  }

  updateMaterialDate () {
    this.refs.field.parentNode.MaterialTextfield.change(AbstractDateTimeField.date())
  }

  render () {
    const classes = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label ' + (this.props.formValue.errorList.length ? 'is-invalid' : '')

    return (
      <div className={classes}>
        <input id={this.props.select} className='mdl-textfield__input' readOnly ref='field' type='text'
          value={this.props.formValue.value} onFocus={this.onToggle} onChange={this.onChange} />
        <label className='mdl-textfield__label'>{this.props.label}</label>
        <ErrorList className='mdl-textfield__error' formValue={this.props.formValue} />
      </div>
    )
  }

  onOk = () => this.props.formValue.update(AbstractDateTimeField.date(this.state.dialog.time))
}

export default withFormValue(DatepickerField)
