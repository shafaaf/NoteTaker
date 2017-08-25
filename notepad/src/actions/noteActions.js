import Axios from 'axios';

const booksUrl = 'http://localhost:8080/api/note';
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
export const editNoteSuccess = (note, index) => {
  console.log("Action dispatched- editNoteSuccess. note is: ", note);
  return {
    type: "EDIT_NOTE_SUCCESS",
    note,
    index
  }
};
export const deleteNoteSuccess = (note, index) => {
  console.log("Action dispatched- deleteNoteSuccess. note is: ", note);
  return {
    type: "DELETE_NOTE_SUCCESS",
    note,
    index
  }
};

// Async actions
export const fetchNotes = () => {
  console.log("Action dispatched- fetchNotes");
  return (dispatch) => {
    return Axios.get(booksUrl)
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
        console.log("response.data is: ", response.data);
        var noteFromServer = response.data.note;
        note.id = noteFromServer.id;
        note.creationtime = noteFromServer.creationtime;
        note.title = noteFromServer.title;
        note.description = noteFromServer.description;
        dispatch(createNoteSuccess(note));
      })
      .catch(error => {
        throw(error);
      });
  };
};
export const editNote = (note, index) => {
  console.log("Action dispatched- editNote. note is: ", note);
  var putUrl = booksUrl + "/" + note.id;
  return (dispatch) => {
    return Axios.put(putUrl, note)
      .then(response => {
        console.log("response.data is: ", response.data);
        dispatch(editNoteSuccess(note, index));
      })
      .catch(error => {
        console.log("error is: ", error);
        throw(error);
      });
  };
};
export const deleteNote = (note, index) => {  // caution note index is differnet from note id
  console.log("Action dispatched- deleteNote. note is: ", note);
  console.log("Action dispatched- deleteNote. index is: ", index);
  
  var deleteUrl = booksUrl + "/" + note.id;
  return (dispatch) => {
    return Axios.delete(deleteUrl)
      .then(response => {
        console.log("response.data is: ", response.data);
        dispatch(deleteNoteSuccess(note, index));
      })
      .catch(error => {
        console.log("error is: ", error);
        throw(error);
      });
  };
};

