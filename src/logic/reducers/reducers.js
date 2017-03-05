import { combineReducers } from 'redux'

import {CALCULATE, ADD_TIME} from '../actions/actions';

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

function timelist(state = {times: []}, action) {
    switch (action.type) {
        case ADD_TIME :
            return Object.assign({}, state, {
                times : [...state.times, action.time]
            });
        default:
            return state
    }
}

export default combineReducers({
    timelist,
    calculate
})
