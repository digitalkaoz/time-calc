import React from "react";
import PropTypes from "prop-types";

import { TableCell, TableRow, withStyles } from "@material-ui/core";

import { batchActions } from "redux-batched-actions";
import { connect } from "react-redux";

import Moment from "moment";

import withDialog from "../Dialog/Dialog";
import Button from "../Button/Button";

import { deleteTime, setField } from "../../connectors/redux/actions";

const styles = theme => ({
  hideMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none !important"
    }
  },

  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    "& button": {
      opacity: 0
    },
    "&:hover": {
      "& button": {
        opacity: 1
      }
    }
  },

  important: {
    // fontWeight: 'bold',
  }
});

export const Timeset = ({ classes, time, onEditTime, toggleDialog, index }) => {
  const date = new Moment(time.date, "L").format("LL"); // TODO should be refactored out into time utils

  return (
    <TableRow className={classes.row}>
      <TableCell className={classes.important}>{date}</TableCell>
      <TableCell className={classes.hideMobile}>{time.description}</TableCell>
      <TableCell className={classes.hideMobile} align="right">
        {time.start}
      </TableCell>
      <TableCell className={classes.hideMobile} align="right">
        {time.end}
      </TableCell>
      <TableCell className={classes.hideMobile} align="right">
        {time.break}
      </TableCell>
      <TableCell className={classes.important} align="right">
        {time.duration}
      </TableCell>
      <TableCell>
        <Button
          invoke={() => onEditTime({ index, time })}
          label="Edit"
          icon="edit"
        />
        <Button
          color="secondary"
          invoke={() =>
            toggleDialog(time, "Delete Time?", "really delete this TimeRecord?")
          }
          label="Delete"
          icon="delete"
        />
      </TableCell>
    </TableRow>
  );
};

Timeset.propTypes = {
  toggleDialog: PropTypes.func,
  time: PropTypes.object.isRequired,
  onEditTime: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

export const StyledTimeset = withStyles(styles)(Timeset);

const mapDispatchToProps = dispatch => ({
    onOk: time => dispatch(deleteTime(time)),
    onEditTime: time =>
      dispatch(
        batchActions([
          setField("start", time.time.start),
          setField("end", time.time.end),
          setField("date", time.time.date),
          setField("break", time.time.break),
          setField("duration", time.time.duration),
          setField("index", time.index),
          setField("description", time.time.description)
        ])
      )
  });

export default connect(
  null,
  mapDispatchToProps
)(withDialog(StyledTimeset));
