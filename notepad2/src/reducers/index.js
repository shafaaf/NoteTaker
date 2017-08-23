import { combineReducers } from 'redux';
import { notesReducer } from './noteReducers'

// Imp: This decides states
export default combineReducers({
  notes: notesReducer
});
