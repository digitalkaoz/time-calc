import React from 'react'
import AbstractDateTimeField from '../AbstractDateTimeField'
import {ErrorList, withFormValue} from 'react-forms'
import Moment from 'moment'
import PropTypes from 'prop-types';

import DatePicker from 'md-date-time-picker/dist/js/mdDateTimePicker'

import './DateField.css'

export class DatepickerField extends AbstractDateTimeField {
  static propTypes = {
    formValue: PropTypes.object.isRequired,
    label: PropTypes.string,
    select: PropTypes.string.isRequired
  }

  createPicker () {
    const moment = new Moment()
    moment.set('year', moment.get('year') + 1)

    return new DatePicker({
      type: 'date',
      future: moment,
      orientation: 'LANDSCAPE'
    })
  }

  updateDialogDate () {
    this.state.dialog.time = AbstractDateTimeField.date(this.props.formValue.value)
    // this.setState({dialog: {...this.state.dialog, time : AbstractDateTimeField.date(this.props.formValue.value)}});
  }

  updateMaterialDate () {
    this.field.parentNode.MaterialTextfield.change(AbstractDateTimeField.date())
  }

  render () {
    const classes = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label ' + (this.props.formValue.errorList.length ? 'is-invalid' : '')

    return (
      <div className={classes}>
        <input id={this.props.select} className='mdl-textfield__input' readOnly ref={(input) => { this.textInput = input; }}  type='text'
          value={this.props.formValue.value} onFocus={this.onToggle} onChange={this.onChange} />
        <label className='mdl-textfield__label'>{this.props.label}</label>
        <ErrorList className='mdl-textfield__error' formValue={this.props.formValue} />
      </div>
    )
  }

  onOk = () => this.props.formValue.update(AbstractDateTimeField.date(this.state.dialog.time))
}

export default withFormValue(DatepickerField)
