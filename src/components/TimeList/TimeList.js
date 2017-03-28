import React from 'react'
import Button from './../Button/Button'
import Moment from 'moment'
import 'moment-duration-format'
// import 'material-design-lite/src/data-table/data-table';
import autoBind from 'react-autobind'
import {connect} from 'react-redux'
import {clearTimes, downloadTimes, loadTimes} from '../../logic/actions/actions'
import withDialog from '../Dialog/Dialog'

import './TimeList.css'
import Timeset from '../Timeset/Timeset'

export class TimeList extends React.Component {
  static defaultProps = {
    times: {}
  };

  static propTypes = {
    // times: React.PropTypes.array,
    toggleDialog: React.PropTypes.func,
    times: React.PropTypes.objectOf(React.PropTypes.object),
    load: React.PropTypes.func.isRequired,
    download: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    autoBind(this)
  }

  componentDidMount () {
    this.props.load()
  }

  calculateSum () {
    let durationSum = Moment.duration('00:00')
    Object.keys(this.props.times).map(t => durationSum.add(this.props.times[t].duration))
        // this.props.times.map(t => durationSum.add(t.duration))
    return durationSum.format('HH:mm', {trim: false})
  }

  render () {
        // if (!this.props.times || !this.props.times.length) {
    if (!this.props.times || !Object.keys(this.props.times).length) {
      return <div />
    }

    const sum = this.calculateSum()

    return (
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
              <Button invoke={this.props.toggleDialog} context={this.props.times} icon='delete' />
            </th>
          </tr>
        </thead>

        <tbody>
          { Object.keys(this.props.times).map((k) => <Timeset key={k} time={this.props.times[k]} index={parseInt(k)} />) }
          <tr>
            <td colSpan='4' />
            <td><b id='sum'>{ sum }</b></td>
            <td />
          </tr>
        </tbody>
      </table>
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
    onOk: () => dispatch(clearTimes()),
    download: (times) => dispatch(downloadTimes(times))
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withDialog(TimeList, 'deleteAll'))
