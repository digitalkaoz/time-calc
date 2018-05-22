import React from "react";
// import './Button.css'
// import 'material-design-lite/src/button/button'
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

const GenericButton = ({ invoke, context, classes, icon, type }) => (
  <Button
    disabled={!invoke}
    variant="raised"
    color="primary"
    className={classes}
    type={type || "button"}
    onClick={() => type ? true : invoke(context)}
  >
    <i className="material-icons">{icon}</i>
  </Button>
);

export default GenericButton;
