import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NoteForm from './NoteForm';
import { Link } from 'react-router';
import * as noteActions from '../actions/noteActions';
import Draggable, {DraggableCore} from 'react-draggable';
import InlineEdit from 'react-edit-inline';
import { Button, Glyphicon, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import './css/notes.css';

class Notes extends React.Component{
  constructor(props){
    super(props);
  }
  
  submitNote(input){
    console.log("Submitting note. input is: ", input);
    this.props.createNote(input);
  }

  // Todo: Called twice so fix
  validateTitleEdit(index, text){
    console.log("At validateTitleEdit. index is: ", index);
    console.log("At validateTitleEdit. new text is: ", text);
    console.log("validateTitleEdit: this.props.notes is: ", this.props.notes);
    var newNote = Object.assign({}, this.props.notes[index]);
    newNote["title"] = text;
    console.log("validateTitleEdit: newNote is: ", newNote);
    this.props.editNote(newNote, index);
    return false;
  }

  titleChanged(data){
    console.log("At titleChanged. data is: ", data);
  }

  validateDescriptionEdit(index, text){
    console.log("At validateDescriptionEdit. index is: ", index);
    console.log("At validateDescriptionEdit. new text is: ", text);
    console.log("at validateDescriptionEdit: this.props.notes is: ", this.props.notes);
    var newNote = Object.assign({}, this.props.notes[index]);
    newNote["description"] = text;
    console.log("At validateDescriptionEdit: newNote is: ", newNote);
    this.props.editNote(newNote, index);
    return false;
  }

  descriptionChanged(description){
    console.log("At descriptionChanged. description is: ", description);
  }
  
  onClickRemove(index){
    console.log("onClickRemove called. index is: ", index);
    var noteToDelete = this.props.notes[index];
    console.log("noteToDelete is: ", noteToDelete);
    this.props.deleteNote(noteToDelete, index);
    return;
  }
  onClickColorChange(color){
    console.log("onClickColorChange called. color is: ", color);
  }

  renderNotes(){
    console.log("renderNotes: this.props.notes is: ", this.props.notes);
    const listItems = this.props.notes.map((note, index) =>
      <Draggable bounds="parent" key={index}>
        <li>
          <a style = {{ textDecoration:"none", color: "#000000", background:"#ffc"}}>  {/*style = {{background:"#cfc"}}*/}       
            <h2 style = {{textAlign: "center"}}>
              <InlineEdit 
                validate={this.validateTitleEdit.bind(this, index)} 
                activeClassName="editing" 
                text={note.title} 
                paramName="message" 
                change={this.titleChanged}/>
                
              <Glyphicon
                glyph="remove" 
                style = {{paddingLeft: "20px"}}
                onClick = {this.onClickRemove.bind(this, index)}/>

                <Dropdown style = {{paddingLeft: "7px"}} id="dropdown-custom-1" onSelect={function(evt){console.log(evt)}}>       
                  <Dropdown.Toggle style = {{background: "#ffc"}}>
                    <Glyphicon glyph="tag"/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="super-colors" onSelect={function(evt){console.log(evt)}}>
                    <p onClick= {this.onClickColorChange.bind(this, "#cfc")} style = {{background: "#cfc", textAlign: "center", cursor: "pointer"}}>Cyan</p>
                    <p onClick= {this.onClickColorChange.bind(this, "#ffc")} style = {{background: "#ffc", textAlign: "center", cursor: "pointer"}}>Yellow</p>
                    <p onClick= {this.onClickColorChange.bind(this, "#ccf")} style = {{background: "#ccf", textAlign: "center", cursor: "pointer"}}>Purple</p>
                  </Dropdown.Menu>
                </Dropdown>
            </h2>
            <p>
              <InlineEdit 
                validate={this.validateDescriptionEdit.bind(this, index)} 
                activeClassName="editing" 
                text={note.description} 
                paramName="newCategory" 
                change={this.descriptionChanged.bind(this, note.description)}/>
            </p>            
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
        <div className="col-md-12" style = {{textAlign: "center"}}>
          <h3>Add New Note</h3>
          <NoteForm submitBook={this.submitNote.bind(this)}/>
        </div>
        <div className="col-md-12" style = {{border: "3px solid black"}}>
          <h3 style = {{textAlign: "center"}}>My Notes</h3>
          <ul>
            {this.renderNotes()}
          </ul>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(noteActions, dispatch);
}

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Notes);
