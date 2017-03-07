import { combineReducers } from 'redux'

import {CALCULATE, ADD_TIME, LOAD_TIMES, CLEAR_TIMES, DELETE_TIME, DOWNLOAD_TIMES} from '../actions/actions';
import store from 'store/dist/store.modern';
import Moment from 'moment';

function calculate(state = { current: {}}, action) {
    switch (action.type) {
        case CALCULATE:
            return Object.assign({}, state, {
                current: action.response
            });
        default:
            return state
    }
}

//TODO split into services
function timelist(state = {times: []}, action) {
    let times = state.times || [];

    switch (action.type) {
        case LOAD_TIMES:
            return Object.assign({}, state, {
                times : store.get('times')
            });
        case CLEAR_TIMES: {
            store.set('times', []);
            return Object.assign({}, state, {
                times : []
            });
        }
        case ADD_TIME :
            times = [...times, action.time];

            times =  times.sort((a,b) => {
                a = Moment(a.day, Moment.ISO_8601);
                b = Moment(b.day, Moment.ISO_8601);

                if (a.isBefore(b)) {
                    return -1;
                }

                if (a.isAfter(b)) {
                    return 1;
                }
                return 0;
            });

            store.set('times', times)
            return Object.assign({}, state, {
                times : times
            });
        case DELETE_TIME :
            times = times.filter(t => t !== action.time);

            store.set('times', times)
            return Object.assign({}, state, {
                times : times
            });
        case DOWNLOAD_TIMES :
            let lines = [];
            times.forEach(function (line, index) {
                let lineData = [];
                let headers = [];
                for (let key in line) {
                    if (line.hasOwnProperty(key)) {
                        lineData.push(line[key]);
                    }
                    if (index === 0 && line.hasOwnProperty(key)) {
                        headers.push(key);
                    }
                }

                if (index === 0) {
                    lines.push("data:text/csv;charset=utf-8," + headers.join(','));
                }
                lines.push(lineData.join(","));
            });
            const csvContent = lines.join("\n");
            window.open(encodeURI(csvContent));

            return Object.assign({}, state, {
                times : times
            });
        default:
            return state
    }
}

export default combineReducers({
    timelist,
    calculate
})
