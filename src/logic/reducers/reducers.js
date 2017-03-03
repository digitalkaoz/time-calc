import { combineReducers } from 'redux'

import {fetchCalculation, CALCULATE} from '../actions/actions';

const initialState = {
    times: {}
}

function calculateTime(state = initialState, action) {
    switch (action.type) {
        case CALCULATE:
            return Object.assign({}, state, {
                times: typeof action.response === 'undefined' ? fetchCalculation(state.form) : action
            })
        default:
            return state
    }
}
export default combineReducers({
//    visibilityFilter,
    calculateTime
})
