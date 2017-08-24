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
    
    default:
      console.log("Reducer: default");
      return state;
  }
};
