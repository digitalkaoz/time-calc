export const CALCULATE = 'CALCULATE'
export const ADD_TIME = 'ADD_TIME'
export const LOAD_TIMES = 'LOAD_TIMES'
export const CLEAR_TIMES = 'CLEAR_TIMES'
export const DELETE_TIME = 'DELETE_TIME'
export const DOWNLOAD_TIMES = 'DOWNLOAD_TIMES'
export const RESET_CALCULATION = '@@redux-form/RESET'
export const EDIT_TIME = '@@redux-form/INITIALIZE'
export const CALCULATION_FETCHED = '@@redux-form/CHANGE'
export const TIMES_CLEANED = 'TIMES_CLEANED'
export const TIMES_LOADED = 'TIMES_LOADED'

export function timesLoaded (times) {
  return {
    type: TIMES_LOADED,
    times: times
  }
}

export function calculationFetched (calculation) {
  return {
    type: CALCULATION_FETCHED,
    meta: {form: 'time', field: 'duration'},
    payload: calculation.duration
  }
}

export function fetchCalculation (form) {
  return {
    type: CALCULATE,
    form: form
  }
}

export function timesCleaned () {
  return {
    type: TIMES_CLEANED
  }
}

export function resetCalculation () {
  return {
    type: RESET_CALCULATION,
    meta: {form: 'time'}
  }
}

export function save (time, index) {
  return {
    type: ADD_TIME,
    time: time,
    index: index
  }
}

export function loadTimes () {
  return {
    type: LOAD_TIMES
  }
}

export function clearTimes () {
  return {
    type: CLEAR_TIMES
  }
}

export function deleteTime (time) {
  return {
    type: DELETE_TIME,
    time: time
  }
}

export function downloadTimes (times) {
  return {
    type: DOWNLOAD_TIMES,
    times: times
  }
}

export function editTime (time) {
  return {
    type: EDIT_TIME,
    meta: {form: 'time'},
    payload: {...time.time, index: time.index}
  }
}
