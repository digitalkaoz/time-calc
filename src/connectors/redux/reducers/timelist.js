import {TIMES_LOADED, TIMES_CLEANED} from '../actions'

export default class Timelist {
  static dispatch (state = { times: [] }, action) {
    if (!Timelist.instance) {
      Timelist.instance = new Timelist()
    }

    return Timelist.instance.process(state, action)
  }

  process (state, action) {
    this.state = state
    this.times = state.times || []
    this.action = action

    switch (action.type) {
      case TIMES_LOADED: return this.loadTimes()
      case TIMES_CLEANED: return this.clearTimes()
      default: return state
    }
  }

  loadTimes () {
    return {
      ...this.state,
      times: this.action.times
    }
  }

  clearTimes () {
    return {
      ...this.state,
      times: []
    }
  }
}
