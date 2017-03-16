import Moment from 'moment'

import {CALCULATION_FETCHED, EDIT_TIME, RESET_CALCULATION} from '../actions/actions'

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
      case CALCULATION_FETCHED: return this.calculate()
      case RESET_CALCULATION:return this.reset()
      case EDIT_TIME: return this.edit()
      default: return state
    }
  }

  calculate () {
    return {
      ...this.state,
      current: this.action.calculation
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
}
