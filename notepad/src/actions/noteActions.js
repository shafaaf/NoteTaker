import Axios from 'axios';

const getBooksUrl = 'http://localhost:8080/api/note';
const addBookUrl = 'http://localhost:8080/api/note/add';

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
    return Axios.get(getBooksUrl)
      .then(response => {
        console.log("response is: ", response);
        dispatch(fetchNotesSuccess(response.data.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
export const createNote = (note) => {
  console.log("Action dispatched- createNote. note is: ", note);
  return (dispatch) => {
    return Axios.post(addBookUrl, note)
      .then(response => {
        console.log("response is: ", response);
        dispatch(createNoteSuccess(note));
      })
      .catch(error => {
        throw(error);
      });
  };
};
