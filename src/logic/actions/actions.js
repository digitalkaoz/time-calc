export const CALCULATE = 'CALCULATE'
export const ADD_TIME = 'ADD_TIME'
export const LOAD_TIMES = 'LOAD_TIMES'
export const CLEAR_TIMES = 'CLEAR_TIMES'
export const DELETE_TIME = 'DELETE_TIME'
export const DOWNLOAD_TIMES = 'DOWNLOAD_TIMES'
export const RESET_CALCULATION = 'RESET_CALCULATION'
export const EDIT_TIME = 'EDIT_TIME';

import Form from '../reducers/calculate';

export function fetchCalculation (form) {
  return (dispatch) => {
      if (navigator.onLine) {
          Form.calculateRemote(form).then(result => {
              dispatch({
                  type: CALCULATE,
                  form: result,
              });
          })
      } else {
          dispatch({
              type: CALCULATE,
              form: Form.calculateLocal(form),
          });
      }
  }
}

export function resetCalculation () {
  return (dispatch) => {
    dispatch({
      type: RESET_CALCULATION
    })
  }
}

export function save (time, index) {
  return (dispatch) => {
    dispatch({
      type: ADD_TIME,
      time: time,
      index: index
    })
  }
}

export function loadTimes () {
  return (dispatch) => {
    dispatch({
      type: LOAD_TIMES
    })
  }
}

export function clearTimes () {
  return (dispatch) => {
    dispatch({
      type: CLEAR_TIMES
    })
  }
}

export function deleteTime (time) {
  return (dispatch) => {
    dispatch({
      type: DELETE_TIME,
      time: time
    })
  }
}

export function downloadTimes (times) {
  return (dispatch) => {
    dispatch({
      type: DOWNLOAD_TIMES,
      times: times
    })
  }
}

export function editTime (time) {
    return (dispatch) => {
        dispatch({
            type: EDIT_TIME,
            time: time
        })
    }
}
