import { combineReducers } from 'redux';
import { notesReducer } from './notesReducers'

export default combineReducers({
	notes: notesReducer
	// shaf: []
	// More reducers if there are
	// can go here
});
