import { combineReducers } from 'redux'

import Timelist from './timelist';
import Form from './calculate';

export default combineReducers({
  timelist: Timelist.dispatch,
  calculate: Form.dispatch
})
