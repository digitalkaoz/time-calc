import React from "react";
import PropTypes from "prop-types";

import { TimePicker } from "material-ui-pickers";
import Icon from '@material-ui/core/Icon';

import { TimeHelper } from "../../connectors/redux/helpers";

const timeMask = value => {
  const chars = value.split("");

  const hours = [/[0-2]/, chars[0] === "2" ? /[0-3]/ : /[0-9]/];

  const minutes = [/[0-5]/, /[0-9]/];

  return hours.concat(":").concat(minutes);
};

/* if (keyboard) { localInputProps[${adornmentPosition}Adornment] = ( <InputAdornment position={adornmentPosition} {...InputAdornmentProps} disabled={disabled}> <IconButton onClick={this.openPicker}> <Icon> {keyboardIcon} </Icon> </IconButton> </InputAdornment> ); } */

const TimeField = ({ input, label, showPicker, disabled, defaultValue }) => (
  <TimePicker
    value={input && input.value ? TimeHelper.time(input.value) : null}
    onChange={date => input.onChange(TimeHelper.time(date))}
    keyboard
    label={label}
    InputLabelProps={{
      shrink: true,
      htmlFor: label.replace(/ /g, "_").toLowerCase()
    }}
    mask={timeMask}
    id={label.replace(/ /g, "_").toLowerCase()}
    autoOk
    placeholder={defaultValue || TimeHelper.now()}
    disableOpenOnEnter
    fullWidth
    todayLabel="Now"
    keyboardIcon={<Icon color="primary">timer</Icon>}
    ampm={false}
    keepCharPositions
    InputAdornmentProps={{
      style: {
        display: showPicker === false ? "none" : "flex"
      },
    }}
    KeyboardButtonProps={{
      "aria-label": label
    }}
    disabled={disabled}
    invalidDateMessage="Invalid Time"
    showTodayButton
    // tabIndexIconButton="-1"
  />
);

TimeField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  showPicker: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any
};

export default TimeField;
