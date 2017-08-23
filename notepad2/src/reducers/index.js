import { combineReducers } from 'redux';
import { notesReducer } from './noteReducers'

var shafaaf = "test";
// Imp: This decides states
export default combineReducers({
  notes: notesReducer,
  shafaaf: notesReducer
});
