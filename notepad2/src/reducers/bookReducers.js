import * as actionTypes from '../actions/actionTypes';

export const booksReducer = (state = [], action) => {
  console.log("booksReducer running.")
  console.log("state is: ", state);
  console.log("action is: ", action);
  switch (action.type){
    case 'CREATE_BOOK_SUCCESS':
      console.log("Reducer: CREATE_BOOK_SUCCESS");
      return [
        ...state,
        Object.assign({}, action.book)
      ];
    case 'FETCH_BOOKS_SUCCESS':
      console.log("Reducer: FETCH_BOOKS_SUCCESS");
      return action.books;
    default:
      console.log("Reducer: default");
      return state;
  }
};

// For handling a single book
export const bookReducer = (state = [], action) => {
  console.log("singleBookReducer running.")
  console.log("state is: ", state);
  console.log("action is: ", action);
  switch (action.type) {
    case actionTypes.FETCH_BOOK_BY_ID_SUCCESS: // Handle fetch by Id
      console.log("Reducer: FETCH_BOOK_BY_ID_SUCCESS");
      return action.book;
    default:
      return state;
  }
};
