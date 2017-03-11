import React from "react";
import { connect } from 'react-redux'
import Button from './../Button/Button';
import Moment from 'moment';
import 'moment-duration-format';
//import 'material-design-lite/src/data-table/data-table';

import './TimeList.css';
import {loadTimes, clearTimes, deleteTime, downloadTimes} from '../../logic/actions/actions';

class TimeList extends React.Component {

    componentDidMount() {
        this.props.load();
    }

    render () {
        if (!this.props.times || !this.props.times.length) {
            return <div></div>
        }

        let durationSum = Moment.duration('00:00');
        this.props.times.map(t => durationSum.add(t.duration));

        return (
            <div>
                <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp" id="times">
                    <thead>
                    <tr>
                        <th className="mdl-data-table__cell--non-numeric">Day</th>
                        <th className="mdl-cell--hide-phone">Start</th>
                        <th className="mdl-cell--hide-phone">End</th>
                        <th className="mdl-cell--hide-phone">Break</th>
                        <th>Duration</th>
                        <th>
                            <Button invoke={this.props.download} context={this.props.times} icon="cloud_download" />
                            <Button invoke={this.props.clear} context={this.props.times}  icon="delete"/>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.times.map((t, k) => { return <tr key={k}>
                        <td className="mdl-data-table__cell--non-numeric">{new Moment(t.date).format('LL')}</td>
                        <td className="mdl-cell--hide-phone">{t.start}</td>
                        <td className="mdl-cell--hide-phone">{t.end}</td>
                        <td className="mdl-cell--hide-phone">{t.break}</td>
                        <td>{t.duration}</td>
                        <td><Button invoke={this.props.delete} context={t} icon="delete" /></td>
                    </tr>})}
                    <tr><td colSpan="4"/><td><b>{durationSum.format('HH:mm', { trim: false })}</b></td><td /></tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        times: state.timelist.times
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => dispatch(loadTimes()),
        clear: () => dispatch(clearTimes()),
        delete: (time) => dispatch(deleteTime(time)),
        download: (times) => dispatch(downloadTimes(times))
    }
}

//TimeList.propTypes = { times: React.PropTypes.array }
TimeList.props = {times: []};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeList)
