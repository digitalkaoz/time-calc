import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'

import Moment from 'moment'
import {connect} from 'react-redux'
import withDialog from '../Dialog/Dialog'
import {deleteTime, editTime} from '../../logic/actions/actions'

const styles = theme => ({
  hideMobile: {
    [theme.breakpoints.down('xs')]: {
      display: 'none !important'
    }
  },

  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    },
    '& button': {
      opacity: 0
    },
    '&:hover': {
      '& button': {
        opacity: 1
      }
    }
  },

  important: {
    // fontWeight: 'bold',
  }
})

export const Timeset = ({classes, time, onEditTime, toggleDialog, index}) => {
  const date = new Moment(time.date, 'L').format('LL') // TODO should be refactored out into time utils

  return <TableRow className={classes.row}>
    <TableCell className={classes.important}>{date}</TableCell>
    <TableCell className={classes.hideMobile} numeric>{time.start}</TableCell>
    <TableCell className={classes.hideMobile} numeric>{time.end}</TableCell>
    <TableCell className={classes.hideMobile} numeric>{time.break}</TableCell>
    <TableCell className={classes.important} numeric>{time.duration}</TableCell>
    <TableCell>
      <IconButton onClick={() => onEditTime({index: index, time: time})} aria-label='Edit'>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => toggleDialog(time, 'Delete Time?', 'really delete this TimeRecord?')} aria-label='Delete'>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
}

Timeset.propTypes = {
  toggleDialog: PropTypes.func,
  time: PropTypes.object.isRequired,
  onEditTime: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export const StyledTimeset = withStyles(styles)(Timeset);

const mapDispatchToProps = (dispatch) => {
  return {
    onOk: (time) => dispatch(deleteTime(time)),
    onEditTime: (time) => dispatch(editTime(time))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withDialog(StyledTimeset))
