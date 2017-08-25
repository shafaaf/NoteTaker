import Axios from 'axios';

const booksUrl = 'http://localhost:8080/api/note';
const addBookUrl = 'http://localhost:8080/api/note/add';

// Success Actions
export const getNotesSuccess = (notes) => {
  console.log("Action dispatched- getNotesSuccess. notes is: ", notes);
  return {
    type: "GET_NOTES_SUCCESS",
    notes
  }
};
export const getCustomNotesSuccess = (notes) => {
  console.log("Action dispatched- getCustomNotesSuccess. notes is: ", notes);
  return {
    type: "GET_CUSTOM_NOTES_SUCCESS",
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
export const getNotes = () => {
  console.log("Action dispatched- getNotes");
  return (dispatch) => {
    return Axios.get(booksUrl)
      .then(response => {
        console.log("response is: ", response);
        dispatch(getNotesSuccess(response.data.data));
      })
      .catch(error => {
        alert("Error in getting all notes.");
        throw(error);
      });
  };
};
export const getCustomNotes = (searchSettings) => {
  console.log("Action dispatched- getCustomNotes. searchSettings is: ", searchSettings);
  var flag = 0;
  var url = booksUrl + "?";
  if((searchSettings.order != null) && (searchSettings.order != "")){ //order
    url = url + "&order=" + searchSettings.order;
  }
  if(searchSettings.limit != null && (searchSettings.limit != "")){ //limit
    url = url + "&limit=" + searchSettings.limit;
  }
  if(searchSettings.start != null && (searchSettings.start != "")){ //start
    console.log("entering here");
    url = url + "&start=" + searchSettings.start;
  }
  console.log("final url is: ", url);
  return (dispatch) => {
    return Axios.get(url)
      .then(response => {
        console.log("response.data is: ", response.data);
        dispatch(getCustomNotesSuccess(response.data.data));
      })
      .catch(error => {
        alert("Error in getting custom search notes. Make sure Limit is a positive number and Start Point greater than or equal to 1.");
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
        note.color = noteFromServer.color;
        dispatch(createNoteSuccess(note));
      })
      .catch(error => {
        alert("Error in creating note.");
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
        alert("Error in editing note.");
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
        alert("Error in deleting note.");
        throw(error);
      });
  };
};

