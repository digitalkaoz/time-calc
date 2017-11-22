import React from 'react'
import {connect} from 'react-redux'
import Button from './../Button/Button'
import Moment from 'moment'
import pure from 'recompose/pure'
import withDialog from '../Dialog/Dialog'
import {deleteTime, editTime} from '../../logic/actions/actions'
import './Timeset.css'
import PropTypes from 'prop-types';

export const Timeset = ({time, onEditTime, toggleDialog, index}) => {
  const date = new Moment(time.date, 'L').format('LL') // TODO should be refactored out into time utils
  const editContext = {index: index, time: time}

  return <tr>
    <td className='mdl-data-table__cell--non-numeric'>{date}</td>
    <td className='mdl-cell--hide-phone'>{time.start}</td>
    <td className='mdl-cell-- hide-phone'>{time.end}</td>
    <td className='mdl-cell--hide-phone'>{time.break}</td>
    <td>{time.duration}</td>
    <td>
      <Button invoke={onEditTime} context={editContext} icon='edit' />
      <Button invoke={toggleDialog} context={time} icon='delete' />
    </td>
  </tr>
}

Timeset.propTypes = {
  toggleDialog: PropTypes.func,
  time: PropTypes.object.isRequired,
  onEditTime: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOk: (time) => dispatch(deleteTime(time)),
    onEditTime: (time) => dispatch(editTime(time))
  }
}

export default connect(
    null,
    mapDispatchToProps
)(withDialog(Timeset, 'deleteOne'))
