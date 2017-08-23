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

// Async actions
export const fetchNotes = () => {
  console.log("Action dispatched- fetchNotes");
  return (dispatch) => {
    
    return fetch(apiUrl)
  		.then(response => {
			if (response.status !== 200) {   
          		console.log('Looks like there was a problem. Status Code: ' +  response.status);  
          		return;  
        	}
        	response.json()
        		.then(data => {
					console.log("response from server is: ", data);
					dispatch(fetchNotesSuccess(data))
				})
				.catch(function (error) {
		            console.log(error.message);
		        })
		})
		.catch(error => {
			throw(error);
		});
  };
};

export const createNote = (note) => {
  console.log("Action dispatched- createNote. note is: ", note);
  return (dispatch) => {
  	return fetch(apiUrl)
  		.then(response => {
			console.log("response from server is: ", response);
			// dispatch(createNoteSuccess(response.data))
		})
		.catch(error => {
			throw(error);
		});

  //   return Axios.post(apiUrl, note)
		// .then(response => {
		// 	console.log("response from server is: ", response);
		// 	// dispatch(createNoteSuccess(response.data))
		// })
		// .catch(error => {
		// 	throw(error);
		// });

  };
};

