import React from 'react';
import { connect } from 'react-redux';
import * as noteActions from '../actions/noteActions';

class MyNotes extends React.Component{
	constructor(props){
		// Pass props back to parent
		super(props);
	}

	// Submit Note
	submitNote(input){
		console.log("submitNote: Submitted note");
	}

	render(){
		// Title input tracker
		let titleInput;
		return (<h2>Notes Page</h2>);
		// return(
		// 	<div>
		// 		<h3>Books</h3>
		// 		<ul>
		// 			{/* Traverse books array  */}
		// 			{this.props.books.map((b, i) => <li key={i}>{b.title}</li> )}
		// 		</ul>
		// 	<div>
		// 	<h3>Books Form</h3>
		// 	<form onSubmit={e => {
		// 		// Prevent request
		// 		e.preventDefault();
		// 		// Assemble inputs
		// 		var input = {title: titleInput.value};
		// 		// Call handler
		// 		this.submitBook(input);
		// 		// Reset form
		// 		e.target.reset();
		// 	}}>
		// 	<input type="text" name="title" ref={node => titleInput = node}/>
		// 	<input type="submit" />
		// 	</form>
		// 	</div>
		// 	</div>
		// );
	}
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.books
    notes: state.notes
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
    createNote: note => dispatch(noteActions.createNote(note))
  }
};

// // Use connect to put them together
// export default MyNotes;
export default connect(mapStateToProps, mapDispatchToProps)(MyNotes);
