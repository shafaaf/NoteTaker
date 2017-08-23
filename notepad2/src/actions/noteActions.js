import Axios from 'axios';
const apiUrl = 'https://599b99f43a19ba0011949be1.mockapi.io/books';

// Success Actions
export const fetchNotesSuccess = (notes) => {
  console.log("Action dispatched- fetchNotesSuccess. notes is: ", notes);
  return {
    type: "FETCH_NOTES_SUCCESS",
    notes
  }
};
export const createNoteSuccess = (note) => {
  console.log("Action dispatched- createNoteSuccess. note is: ", note);
  return {
    type: "CREATE_NOTE_SUCCESS",
    note
  }
};

// Async actions
export const fetchNotes = () => {
  console.log("Action dispatched- fetchNotes");
  return (dispatch) => {
    return Axios.get(apiUrl)
      .then(response => {
        console.log("response is: ", response);
        dispatch(fetchNotesSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
export const createNote = (note) => {
  console.log("Action dispatched- createNote. note is: ", note);
  return (dispatch) => {
    return Axios.post(apiUrl, note)
      .then(response => {
        dispatch(createNoteSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
