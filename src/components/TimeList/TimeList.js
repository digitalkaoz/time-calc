import React from 'react'
import { connect } from 'react-redux'
import Button from './../Button/Button'
import Moment from 'moment'
import 'moment-duration-format'
// import 'material-design-lite/src/data-table/data-table';

import './TimeList.css'
import Timeset from '../Timeset/Timeset';
import {loadTimes, clearTimes, downloadTimes} from '../../logic/actions/actions'

class TimeList extends React.Component {

  componentDidMount () {
    this.props.load()
  }

  render () {
    //if (!this.props.times || !this.props.times.length) {
     if (!this.props.times || !Object.keys(this.props.times).length) {
       return <div />
    }

    let durationSum = Moment.duration('00:00')
    Object.keys(this.props.times).map(t => durationSum.add(this.props.times[t].duration))
    //this.props.times.map(t => durationSum.add(t.duration))

    return (
      <div>
        <table className='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp' id='times'>
          <thead>
            <tr>
              <th className='mdl-data-table__cell--non-numeric'>Day</th>
              <th className='mdl-cell--hide-phone'>Start</th>
              <th className='mdl-cell--hide-phone'>End</th>
              <th className='mdl-cell--hide-phone'>Break</th>
              <th>Duration</th>
              <th>
                <Button invoke={this.props.download} context={this.props.times} icon='cloud_download' />
                <Button invoke={this.props.clear} context={this.props.times} icon='delete' />
              </th>
            </tr>
          </thead>

          <tbody>
            {/*{ this.props.times.map((t,k) => <Timeset key={k} time={t} index={k} />) }*/}
            { Object.keys(this.props.times).map((k) => <Timeset key={k} time={this.props.times[k]} index={k} />) }
            <tr><td colSpan='4' /><td><b>{durationSum.format('HH:mm', { trim: false })}</b></td><td /></tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //we have todo some ugly array->object conversion as the shallow compare of "connect" doesnt recognize the changes in the array value objects
  let objectMap = {};

  state.timelist.times.forEach((v, k) => objectMap[k] = v);

  return {
    times: objectMap
    //times: state.timelist.times
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
