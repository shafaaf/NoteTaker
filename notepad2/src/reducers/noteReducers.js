import * as actionTypes from '../actions/actionTypes';

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

// // For handling a single book
// export const bookReducer = (state = [], action) => {
//   console.log("singleBookReducer running.")
//   console.log("state is: ", state);
//   console.log("action is: ", action);
//   switch (action.type) {
//     case actionTypes.FETCH_BOOK_BY_ID_SUCCESS: // Handle fetch by Id
//       console.log("Reducer: FETCH_BOOK_BY_ID_SUCCESS");
//       return action.book;
//     default:
//       return state;
//   }
// };
