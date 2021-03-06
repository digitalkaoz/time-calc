import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

const WrappedTextField = ({ input, label }) => (
  <TextField
    value={input && input.value ? input.value : ""}
    onChange={value => input.onChange(value)}
    label={label}
    id={label.toLowerCase()}
    InputLabelProps={{
      htmlFor: `${label.toLowerCase()}`
    }}
    fullWidth
  />
);

WrappedTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string
};

export default WrappedTextField;
