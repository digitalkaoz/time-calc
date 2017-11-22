import React from 'react'
import {ErrorList, withFormValue} from 'react-forms'
import DatePicker from 'md-date-time-picker/dist/js/mdDateTimePicker'
import Button from '../Button/Button'
import AbstractDateTimeField from '../AbstractDateTimeField'
import PropTypes from 'prop-types';

import './TimeField.css'

export class TimeField extends AbstractDateTimeField {
  static propTypes = {
    mobile: PropTypes.bool,
    timer: PropTypes.bool
  }

  static defaultProps = {
    mobile: false,
    timer: true
  };

  createPicker () {
    return new DatePicker({
      type: 'time'
    })
  }

  updateDialogDate () {
    this.state.dialog.time = AbstractDateTimeField.time(this.props.formValue.value)
        // this.setState({dialog: {...this.state.dialog, time : AbstractDateTimeField.time(this.props.formValue.value)}});
  }

  updateMaterialDate () {
    if (typeof this.props.formValue.value === 'undefined') {
      this.field.parentNode.MaterialTextfield.change(undefined)
    } else if (this.props.formValue.value) {
      this.field.parentNode.MaterialTextfield.change(AbstractDateTimeField.time(this.props.formValue.value))
    }
  }

  render () {
    const classes = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label ' + (this.props.formValue.errorList.length ? 'is-invalid' : '')
    let listeners = {onChange: this.onChange}

    if (this.props.mobile === false) {
      listeners = {...listeners, onFocus: this.onToggle, onKeyUp: this.onClose}
    }

    return (
      <div className={classes}>
        <input className='mdl-textfield__input' type='time' id={this.props.select} ref={(field) => { this.field = field; }}  value={this.props.formValue.value} placeholder='HH:mm' {...listeners} />
        <label className='mdl-textfield__label'>{this.props.label}</label>
        {this.props.formValue.errorList.length ? <ErrorList className='mdl-textfield__error' formValue={this.props.formValue} /> : undefined}
        {this.props.timer &&
        <Button invoke={this.onUpdate} context={this} icon='timer'
          classes='mdl-button--icon mdl-button--colored pull-right' />}
      </div>
    )
  }

  onToggle = () => {
    this.state.dialog.toggle()
    this.state.dialog.time = AbstractDateTimeField.time(this.props.formValue.value)
  }

  onUpdate = () => this.props.formValue.update(AbstractDateTimeField.time().format('HH:mm'))
  onOk = () => this.props.formValue.update(AbstractDateTimeField.time(this.state.dialog.time))
}

export default withFormValue(TimeField)
