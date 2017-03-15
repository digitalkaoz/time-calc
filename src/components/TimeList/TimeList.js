import React from 'react'
import {connect} from 'react-redux'
import Button from './../Button/Button'
import Moment from 'moment'
import 'moment-duration-format'
// import 'material-design-lite/src/data-table/data-table';
import autoBind from 'react-autobind'

import './TimeList.css'
import Timeset from '../Timeset/Timeset'
import {clearTimes, downloadTimes, loadTimes} from '../../logic/actions/actions'

class TimeList extends React.Component {
  constructor (props) {
    super(props)

    autoBind(this)
  }

  componentDidMount () {
    this.props.load()
  }

  onDelete = () => document.querySelector('#deleteAll').showModal();
  onDialogClose = () => document.querySelector('#deleteAll').close();

  render () {
        // if (!this.props.times || !this.props.times.length) {
    if (!this.props.times || !Object.keys(this.props.times).length) {
      return <div />
    }

    let durationSum = Moment.duration('00:00')
    Object.keys(this.props.times).map(t => durationSum.add(this.props.times[t].duration))
        // this.props.times.map(t => durationSum.add(t.duration))

    return (
      <div>
        <table className='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp'
          id='times'>
          <thead>
            <tr>
              <th className='mdl-data-table__cell--non-numeric'>Day</th>
              <th className='mdl-cell--hide-phone'>Start</th>
              <th className='mdl-cell--hide-phone'>End</th>
              <th className='mdl-cell--hide-phone'>Break</th>
              <th>Duration</th>
              <th>
                <Button invoke={this.props.download} context={this.props.times} icon='cloud_download' />
                <Button invoke={this.onDelete} context={this.props.times} icon='delete' />
              </th>
            </tr>
          </thead>

          <tbody>
            { Object.keys(this.props.times).map((k) => <Timeset key={k} time={this.props.times[k]} index={k} />) }
            <tr>
              <td colSpan='4' />
              <td><b>{durationSum.format('HH:mm', {trim: false})}</b></td>
              <td />
            </tr>
          </tbody>
        </table>

        <dialog className='mdl-dialog' id='deleteAll'>
          <h4 className='mdl-dialog__title'>Really delete Data?</h4>
          <div className='mdl-dialog__content'>
            <p>
                            Your whole times will be lost! Better save now!
                        </p>
          </div>
          <div className='mdl-dialog__actions'>
            <button type='button' className='mdl-button' onClick={this.onDialogClose}>Gimme a sec</button>
            <button type='button' className='mdl-button' onClick={this.props.clear}>Do It</button>
          </div>
        </dialog>

        <dialog className='mdl-dialog' id='deleteOne'>
          <h4 className='mdl-dialog__title'>Really delete Time?</h4>
          <div className='mdl-dialog__content'>
            <p>
                            This time will be lost!
                        </p>
          </div>
          <div className='mdl-dialog__actions'>
            <button type='button' className='mdl-button close'>Gimme a sec</button>
            <button type='button' className='mdl-button ok'>Do It</button>
          </div>
        </dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    // we have todo some ugly array->object conversion as the shallow compare of "connect" doesnt recognize the changes in the array value objects
  let objectMap = {}

  state.timelist.times.forEach((v, k) => {
    objectMap[k] = v
  })

  return {
    times: objectMap
        // times: state.timelist.times
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(loadTimes()),
    clear: () => dispatch(clearTimes()),
    download: (times) => dispatch(downloadTimes(times))
  }
}

// TimeList.propTypes = { times: React.PropTypes.array }
TimeList.props = {times: []}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeList)
