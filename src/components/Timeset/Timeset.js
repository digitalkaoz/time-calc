import React from 'react'
import {connect} from 'react-redux'
import Button from './../Button/Button'
import Moment from 'moment'
import 'moment-duration-format'
import autoBind from 'react-autobind'

import {deleteTime, editTime} from '../../logic/actions/actions'
import './Timeset.css'

class Timeset extends React.Component {
  constructor (props) {
    super(props)

    autoBind(this)
  }

  onClose = () => document.querySelector('#deleteOne').close();
  onDelete () {
    document.querySelector('#deleteOne').close()
    this.props.deleteTime(this.props.time)
  }

  onDialog = () => {
    const dialog = document.querySelector('#deleteOne')

    dialog.querySelector('.ok').removeEventListener('click', this.onDelete, false)
    dialog.querySelector('.close').removeEventListener('click', this.onClose, false)

    dialog.querySelector('.ok').addEventListener('click', this.onDelete, false)
    dialog.querySelector('.close').addEventListener('click', this.onClose, false)

    dialog.showModal()
  }

  render () {
    return <tr>
      <td className='mdl-data-table__cell--non-numeric'>{new Moment(this.props.time.date, 'L').format('LL')}</td>
      <td className='mdl-cell--hide-phone'>{this.props.time.start}</td>
      <td className='mdl-cell--hide-phone'>{this.props.time.end}</td>
      <td className='mdl-cell--hide-phone'>{this.props.time.break}</td>
      <td>{this.props.time.duration}</td>
      <td>
        <Button invoke={this.props.onEditTime} context={{index: this.props.index, time: this.props.time}} icon='edit' />
        <Button invoke={this.onDialog} icon='delete' />
      </td>
    </tr>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTime: (time) => dispatch(deleteTime(time)),
    onEditTime: (time) => dispatch(editTime(time))
  }
}

export default connect(
    null,
    mapDispatchToProps
)(Timeset)
