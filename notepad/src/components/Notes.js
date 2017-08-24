import React from 'react';
import { connect } from 'react-redux';
import NoteForm from './NoteForm';
import { Link } from 'react-router';
import * as noteActions from '../actions/noteActions';

import './css/notes.css';

class Notes extends React.Component{
  constructor(props){
    super(props);
  }
  
  submitNote(input){
    console.log("Submitting note. input is: ", input);
    this.props.createNote(input);
  }

  renderNotes(){
    console.log("this.props.notes is: ", this.props.notes);
    const listItems = this.props.notes.map((note, index) =>
      <li key={index}>
        <a style = {{ textDecoration:"none", color: "#000000"}}>
          <h2>{note.title}</h2>
          <p>{note.description}</p>
        </a>
      </li>
    );
    return listItems;
  }

  render(){
    let titleInput;
    return(
      <div className="row">
        <div className="col-md-6">
          <h3 style = {{textAlign: "center"}}>My Notes</h3>
          <ul>
            {this.renderNotes()}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>New Note</h3>
          {/* Import and inject Notes form */}
         <NoteForm submitBook={this.submitNote.bind(this)}/>
        </div>
      </div>
    );
    // return (<h1>Hii</h1>)
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps: state is: ", state);
  return {
    // You can now say this.props.books
    notes: state.notes
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // You can now say this.props.createNote
    createNote: note => dispatch(noteActions.createNote(note))
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Notes);
