import React from 'react'
import PropTypes from 'prop-types'

import DatePicker from 'material-ui-pickers/DatePicker';

import AbstractDateTimeField from '../AbstractDateTimeField'

const DateField = ({input, label, showPicker}) => <DatePicker
  value={input.value ? AbstractDateTimeField.date(input.value) : null}
  onChange={(date) => input.onChange(AbstractDateTimeField.date(date))}
  keyboard={showPicker !== false}
  label={label}
  format="L"
  //mask={[/\d/, /\d/, ':', /\d/, /\d/]}
  placeholder={AbstractDateTimeField.today()}
  disableOpenOnEnter
  fullWidth
  showTodayButton={true}
  InputLabelProps={{
    shrink: true
  }}
/>;

export default DateField
