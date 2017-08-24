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
        ...state.slice(0, i),  
        {... state[i], title: action.note.title },
        ...state.slice(i+1)
      ];

    default:
      console.log("Reducer: default");
      return state;
  }
};
