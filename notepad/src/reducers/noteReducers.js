export const notesReducer = (state = [], action) => {
  console.log("notesReducer running.")
  console.log("state is: ", state);
  console.log("action is: ", action);
  switch (action.type){
    
    case 'CREATE_NOTE_SUCCESS':
      console.log("Reducer: CREATE_NOTE_SUCCESS");
      return [
        ...state,
        Object.assign({}, action.note)
      ];
    
    case 'FETCH_NOTES_SUCCESS':
      console.log("Reducer: FETCH_NOTES_SUCCESS");
      return action.notes;
    
    case 'EDIT_NOTE_SUCCESS':
      console.log("Reducer: EDIT_NOTE_SUCCESS");
      console.log("Reducer- index is: ", action.index);
      var i = action.index;
      return [
        ...state.slice(0, i), // From the start to the one we want to edit
        {...state[i], title: action.note.title, description: action.note.description, color: action.note.color}, //making new object and copy state[i] here and then overwriting title, description as comma separated means add in
        ...state.slice(i+1) //After the one edited till the end
      ];
    
    case 'DELETE_NOTE_SUCCESS':
      console.log("Reducer: DELETE_NOTE_SUCCESS");
      console.log("Reducer- index is: ", action.index);
      var i = action.index;
      return [
        ...state.slice(0, i), // From the start to the one we want to delete
        ...state.slice(i+1) //After the one deleted till the end
      ];

    default:
      console.log("Reducer: default");
      return state;
  }
};
