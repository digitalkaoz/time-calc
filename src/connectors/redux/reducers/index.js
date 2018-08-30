import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'
import {enableBatching} from 'redux-batched-actions'
import Timelist from './timelist'

export default combineReducers({
  timelist: Timelist.dispatch,
  form: enableBatching(formReducer)
})