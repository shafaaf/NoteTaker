import * as actionTypes from './actionTypes';
import Axios from 'axios';
const apiUrl = 'https://599b99f43a19ba0011949be1.mockapi.io/books';

// Success Actions
export const fetchBooksSuccess = (books) => {
  console.log("Action dispatched- fetchBooksSuccess. books is: ", books);
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    books
  }
};
export const createBookSuccess = (book) => {
  console.log("Action dispatched- createBookSuccess. book is: ", book);
  return {
    type: actionTypes.CREATE_BOOK_SUCCESS,
    book
  }
};
export const fetchBookByIdSuccess = (book) => {
  console.log("Action dispatched- fetchBookByIdSuccess. book is: ", book);
  return {
    type: actionTypes.FETCH_BOOK_BY_ID_SUCCESS,
    book
  }
};

// Async actions
export const fetchBooks = () => {
  console.log("Action dispatched- fetchBooks");
  return (dispatch) => {
    return Axios.get(apiUrl)
      .then(response => {
        console.log("response is: ", response);
        dispatch(fetchBooksSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
export const createBook = (book) => {
  console.log("Action dispatched- createBook. book is: ", book);
  return (dispatch) => {
    return Axios.post(apiUrl, book)
      .then(response => {
        dispatch(createBookSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
export const fetchBookById = (bookId) => {
  console.log("Action dispatched- fetchBookById. bookId is: ", bookId);
  return (dispatch) => {
    return Axios.get(apiUrl + '/' +bookId)
      .then(response => {
        // Handle data with sync action
        console.log("Response from api call is: ", response.data);
        dispatch(fetchBookByIdSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
