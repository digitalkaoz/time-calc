import React from "react";
import { connect } from 'react-redux'

import './TimeList.css';

const TimeList = ({times}) => {
    if (times.length === 0) {
        return <div></div>
    }

    return (
        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp" id="times">
            <thead>
            <tr>
                <th>Day</th>
                <th className="mdl-cell--hide-phone">Start</th>
                <th className="mdl-cell--hide-phone">End</th>
                <th className="mdl-cell--hide-phone">Break</th>
                <th>Duration</th>
            </tr>
            </thead>

            <tbody>
            {times.map(t => { return <tr key={t.day + t.duration}>
                <td>{t.day}</td>
                <td className="mdl-cell--hide-phone">{t.start}</td>
                <td className="mdl-cell--hide-phone">{t.end}</td>
                <td className="mdl-cell--hide-phone">{t.break}</td>
                <td>{t.duration}</td>
            </tr>})}
            </tbody>
        </table>
    );
}

const mapStateToProps = (state) => {
    return {
        times: state.timelist.times
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // save: (time) => {
        //     return dispatch(save(time))
        // }
    }
}

//TimeList.propTypes = { times: React.PropTypes.array }
TimeList.props = {times: []};

export default connect(
    mapStateToProps,
//    mapDispatchToProps
)(TimeList)
