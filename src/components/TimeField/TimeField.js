import React from 'react'
import PropTypes from 'prop-types'

import TimePicker from 'material-ui-pickers/TimePicker';

import AbstractDateTimeField from '../AbstractDateTimeField'

const TimeField = ({input, label, showPicker, disabled, defaultValue}) => <TimePicker
  value={input.value ? AbstractDateTimeField.time(input.value) : null}
  onChange={(date) => input.onChange(AbstractDateTimeField.time(date))}
  keyboard={showPicker !== false}
  label={label}
  mask={[/\d/, /\d/, ':', /\d/, /\d/]}
  placeholder={defaultValue ? defaultValue : AbstractDateTimeField.now()}
  disableOpenOnEnter
  fullWidth
  todayLabel="Now"
  keyboardIcon="timer"
  ampm={false}
  disabled={disabled}
  showTodayButton={true}
  InputLabelProps={{
    shrink: true
  }}
/>;

export default TimeField
