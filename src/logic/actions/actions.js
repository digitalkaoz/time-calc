import fetch from 'isomorphic-fetch'
import Moment from 'moment';
import 'moment-duration-format';

export const CALCULATE = 'CALCULATE';
export const ADD_TIME = 'ADD_TIME';
export const LOAD_TIMES = 'LOAD_TIMES';
export const CLEAR_TIMES = 'CLEAR_TIMES';
export const DELETE_TIME = 'DELETE_TIME';
export const DOWNLOAD_TIMES = 'DOWNLOAD_TIMES';
export const RESET_CALCULATION = 'RESET_CALCULATION';

function fetchCalculationFromServer(form, dispatch) {
    let timeSet = {};

    Object.keys(form.value).map((k) => {
        if (Object.keys(form.schema.properties).indexOf(k) !== -1 && form.value[k] !== '') {
            timeSet[k] = form.value[k];
        }
    });

    const query = Object.keys(timeSet).map(k => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(timeSet[k])}`
    }).join('&');

    fetch((process.env.REACT_APP_SERVER || '/') + 'calculate?' + query)
        .then(response => response.json())
        .then((json) => {
            dispatch({
                type: CALCULATE,
                form: form,
                response: json
            });
        }).catch(e => {
            return calculateLocally(form, dispatch)
    })
}

function calculateLocally(form, dispatch) {
    const breakDuration = Moment.duration(form.value.break);
    const startDate = new Moment(form.value.start, 'HH:mm');
    const endDate = new Moment(form.value.end, 'HH:mm');
    const milliseconds = endDate.subtract(breakDuration).diff(startDate);
    const duration =  Moment.duration(milliseconds / 1000, 'seconds').format('HH:mm', { trim: false });

    dispatch({
        type: CALCULATE,
        form: form,
        response: {
            start: startDate,
            end: endDate,
            break: breakDuration,
            duration: duration
        }
    })
}

export function fetchCalculation(form) {
    return (dispatch) => {
        if (navigator.onLine) {
            fetchCalculationFromServer(form, dispatch);
        } else {
            calculateLocally(form, dispatch);
        }
    }
}

export function resetCalculation() {
    return (dispatch) => {
        dispatch({
            type: RESET_CALCULATION,
        })
    }
}

export function save(time) {
    return (dispatch) => {
        dispatch({
            type: ADD_TIME,
            time: time
        });
    }
}

export function loadTimes() {
    return (dispatch) => {
        dispatch({
            type: LOAD_TIMES
        })
    }
}

export function clearTimes() {
    return (dispatch) => {
        dispatch({
            type: CLEAR_TIMES
        })
    }
}

export function deleteTime(time) {
    return (dispatch) => {
        dispatch({
            type: DELETE_TIME,
            time: time
        })
    }
}

export function downloadTimes(times) {
    return (dispatch) => {
        dispatch({
            type: DOWNLOAD_TIMES,
            times: times
        })
    }
}
