import { combineReducers } from 'redux'

import Timelist from './timelist'
import Form from './form'

export default combineReducers({
  timelist: Timelist.dispatch,
  form: Form.dispatch
})
