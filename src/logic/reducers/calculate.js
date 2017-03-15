import Moment from 'moment'
import fetch from 'isomorphic-fetch'

import {CALCULATE, EDIT_TIME, RESET_CALCULATION} from '../actions/actions'

export default class Form {
  static dispatch (state = {current: {}}, action) {
    if (!Form.instance) {
      Form.instance = new Form()
    }

    return Form.instance.process(state, action)
  }

  process (state = {times: []}, action) {
    this.state = state
    this.action = action

    switch (action.type) {
      case CALCULATE: return this.calculate()
      case RESET_CALCULATION:return this.reset()
      case EDIT_TIME: return this.edit()
      default: return state
    }
  }

  calculate () {
    return {
      ...this.state,
      current: this.action.form
    }
  }

  edit () {
    return {
      ...this.state,
      current: this.action.time.time,
      edit: this.action.time.index
    }
  }

  reset () {
    return {
      ...this.state.state,
      current: {
        date: new Moment().format('L')
      }
    }
  }

  static fetchCalculation (form) {
    if (navigator.onLine) {
      return Form.calculateRemote(form)
    }

    return new Promise((resolve) => {
      resolve(Form.calculateLocal(form))
    })
  }
  static calculateRemote (form) {
    let timeSet = {}

    Object.keys(form.value).forEach((k) => {
      if (Object.keys(form.schema.properties).includes(k) && form.value[k] !== '') {
        timeSet[k] = form.value[k]
      }
    })

    const query = Object.keys(timeSet).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(timeSet[k])}`).join('&')

    return fetch((process.env.REACT_APP_SERVER || '/') + 'calculate?' + query)
            .then(response => response.json())
  }

  static calculateLocal (form) {
    const breakDuration = Moment.duration(form.value.break)
    const startDate = new Moment(form.value.start, 'HH:mm')
    const endDate = new Moment(form.value.end, 'HH:mm')
    const milliseconds = endDate.subtract(breakDuration).diff(startDate)
    const duration = Moment.duration(milliseconds / 1000, 'seconds').format('HH:mm', {trim: false})

    return {
      start: form.value.start,
      end: form.value.end,
      break: form.value.break,
      duration: duration,
      date: form.value.date
    }
  }
}
