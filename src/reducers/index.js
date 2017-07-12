import { combineReducers } from 'redux'
import querybuilder from './querybuilder'
import profile from './profile'

export default combineReducers({
  querybuilder,
  profile
})