import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import Timelist from './timelist'

export default combineReducers({
  timelist: Timelist.dispatch,
  form: formReducer
})
