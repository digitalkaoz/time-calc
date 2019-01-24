import React from "react";
import PropTypes from "prop-types";

import { DatePicker } from "material-ui-pickers";

import { TimeHelper } from "../../connectors/redux/helpers";

const dateMask = value => {
  const chars = value.split("");

  const months = [/[0-1]/, chars[0] === "0" ? /[0-9]/ : /[0-2]/];
  const days = [/[0-3]/, chars[3] === "3" ? /[0-1]/ : /[0-9]/];
  const years = [/[1-3]/, /[0-9]/, /[0-9]/, /[0-9]/];

  return months
    .concat("/")
    .concat(days)
    .concat("/")
    .concat(years);
};

const DateField = ({ input, label, showPicker }) => (
  <DatePicker
    value={input.value ? TimeHelper.date(input.value) : null}
    onChange={date => input.onChange(TimeHelper.date(date))}
    keyboard={showPicker !== false}
    label={label}
    format="L"
    autoOk
    id={label.replace(/ /g, "_").toLowerCase()}
    mask={dateMask}
    placeholder={TimeHelper.today()}
    disableOpenOnEnter
    fullWidth
    showTodayButton
    InputLabelProps={{
      shrink: true,
      htmlFor: label.replace(/ /g, "_").toLowerCase()
    }}
    KeyboardButtonProps={{
      "aria-label": label
    }}
  />
);

DateField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  showPicker: PropTypes.bool
};

export default DateField;
