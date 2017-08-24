import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NoteForm from './NoteForm';
import { Link } from 'react-router';
import * as noteActions from '../actions/noteActions';
import Draggable, {DraggableCore} from 'react-draggable';
import InlineEdit from 'react-edit-inline';

import './css/notes.css';

class Notes extends React.Component{
  constructor(props){
    super(props);
  }
  
  submitNote(input){
    console.log("Submitting note. input is: ", input);
    this.props.createNote(input);
  }

  validateTitleEdit(index, oldNote, newTitle){
    console.log("At validateTitleEdit. index is: ", index);
    console.log("At validateTitleEdit. oldNote is: ", oldNote);
    console.log("At validateTitleEdit. newTitle is: ", newTitle);
    var newNote = Object.assign({}, oldNote);
    newNote["title"] = newTitle;
    console.log("newNote is: ", newNote);
    this.props.editNote(newNote, index);
    return false;
  }

  titleChanged(title){
     console.log("At titleChanged. title is: ", title);
  }

  renderNotes(){
    console.log("renderNotes: this.props.notes is: ", this.props.notes);
    const listItems = this.props.notes.map((note, index) =>
      <Draggable bounds="parent" key={index}>
        <li>
          <a style = {{ textDecoration:"none", color: "#000000"}}>
            <h2>
              <InlineEdit validate={this.validateTitleEdit.bind(this, index, note)} activeClassName="editing" text={note.title} 
                paramName="newCategory" change={this.titleChanged.bind(this, note.title)}/>
            </h2>
            <p>{note.description}</p>
            <p>{note.id}</p>            
          </a>
        </li>
      </Draggable>
    );
    return listItems;
  }

  render(){
    let titleInput;
    return(
    
       <div className="row">
        <div className="col-md-12" style = {{border: "3px solid black"}}>
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
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // You can now say this.props.createNote
//     createNote: note => dispatch(noteActions.createNote(note))
//   }
// };

function mapDispatchToProps(dispatch) {
  return bindActionCreators(noteActions, dispatch);
}

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Notes);
