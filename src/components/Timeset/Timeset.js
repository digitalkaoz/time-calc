import React from 'react'
import { connect } from 'react-redux'
import Button from './../Button/Button'
import Moment from 'moment'
import 'moment-duration-format'

import {deleteTime, editTime} from '../../logic/actions/actions'

const Timeset = ({time, index, onDeleteTime, onEditTime}) => {
    return <tr>
        <td className='mdl-data-table__cell--non-numeric'>{new Moment(time.date, 'L').format('LL')}</td>
        <td className='mdl-cell--hide-phone'>{time.start}</td>
        <td className='mdl-cell--hide-phone'>{time.end}</td>
        <td className='mdl-cell--hide-phone'>{time.break}</td>
        <td>{time.duration}</td>
        <td>
          <Button invoke={onEditTime} context={{index: index, time: time}} icon='edit' />
          <Button invoke={onDeleteTime} context={time} icon='delete' />
        </td>
      </tr>
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteTime: (time) => dispatch(deleteTime(time)),
    onEditTime: (time) => dispatch(editTime(time)),
  }
}

export default connect(
    null,
    mapDispatchToProps
)(Timeset)
