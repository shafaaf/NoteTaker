import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NoteForm from './NoteForm';
import { Link } from 'react-router';
import * as noteActions from '../actions/noteActions';
import Draggable, {DraggableCore} from 'react-draggable';
import InlineEdit from 'react-edit-inline';
import { Button, Glyphicon, DropdownButton, MenuItem, Dropdown, Row, Col, FormControl } from 'react-bootstrap';

import './css/notes.css';

class Notes extends React.Component{
  constructor(props){
    super(props);

    // Search settings
    this.order = null;
    this.limit = null; 
    this.start = null; 
  }
    
  submitNote(input){
    input.color = "#ffc";
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
  onClickColorChange(color, index){
    console.log("onClickColorChange called. color is: ", color);
    console.log("onClickColorChange called. index is: ", index);
    var newNote = Object.assign({}, this.props.notes[index]);
    newNote["color"] = color;
    console.log("At onClickColorChange: newNote is: ", newNote);
    this.props.editNote(newNote, index);
    return;
  }

  renderNotes(){
    console.log("renderNotes: this.props.notes is: ", this.props.notes);
    const listItems = this.props.notes.map((note, index) =>
      <Draggable bounds="parent" key={index}>
        <li>
          <a style = {{ textDecoration:"none", color: "#000000", background: note.color}}>  {/*style = {{background:"#cfc"}}*/}       
            <h2 style = {{textAlign: "center"}}>
              
              <Dropdown style = {{paddingLeft: "7px"}} id="dropdown-custom-1" onSelect={function(evt){console.log(evt)}}>       
                <Dropdown.Toggle style = {{background: note.color}}>
                  <Glyphicon glyph="tag"/>
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors" onSelect={function(evt){console.log(evt)}}>
                  <p onClick= {this.onClickColorChange.bind(this, "#cfc", index)} style = {{background: "#cfc", textAlign: "center", cursor: "pointer"}}>Cyan</p>
                  <p onClick= {this.onClickColorChange.bind(this, "#ffc", index)} style = {{background: "#ffc", textAlign: "center", cursor: "pointer"}}>Yellow</p>
                  <p onClick= {this.onClickColorChange.bind(this, "#ccf", index)} style = {{background: "#ccf", textAlign: "center", cursor: "pointer"}}>Purple</p>
                </Dropdown.Menu>
              </Dropdown>
              
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

  handleOrderChange(e){
    var value = e.target.value;;
    console.log("At handleOrderChange: value is: ", value);
    this.order = value;
  }

  handleLimitChange(e){
    var value = e.target.value;;
    console.log("At handleLimitChange: value is: ", value);
    this.limit = value;
  }

  handleStartChange(e){
    var value = e.target.value;;
    console.log("At handleStartChange: value is: ", value);
    this.start = value;
  }

  handleSubmitCustomSearch(){
    console.log("At handleSubmitCustomSearch");
    var searchSettings = {};
    searchSettings.order = this.order;
    searchSettings.limit = this.limit;
    searchSettings.start = this.start;
    console.log("handleSubmitCustomSearch. searchSettings is: ", searchSettings);
    this.props.getCustomNotes(searchSettings);
  }

  renderSettings(){
    console.log("At renderSettings");
    return (
      <div style = {{marginBottom: "20px"}}>
        <h3>Search Settings</h3>
        
        <Row className="show-grid">
          
          <Col md={4}>  {/* Dropdown for order*/}
            <p>Order</p>
            <select 
            defaultValue="sadas"
            onChange={this.handleOrderChange.bind(this)}>
            <option selected="selected" value="desc">Descending</option>
            <option value="asc">Ascending</option>
            </select>
          </Col>

          <Col md={4}>  {/* Limit input */}
            <p>Limit</p>
            <FormControl
            type="text"
            placeholder="By default, gets all..."
            onChange={this.handleLimitChange.bind(this)}/>
          </Col>
          
          <Col md={4}> {/* Start input */}
            <p>Start Point</p>
            <FormControl
              type="text"
              placeholder="By default, gets from index 1..."
              onChange={this.handleStartChange.bind(this)}/>
          </Col>
        </Row>
        
        <Row className="show-grid" style={{marginTop: "10px"}}>
          <Col>
              <Button bsStyle="primary" onClick={this.handleSubmitCustomSearch.bind(this)}>Search with these settings!</Button>
          </Col>
        </Row>

        
      
      </div> 
    );
  }

  render(){
    let titleInput;
    return(
      <div className="row">
        <div className="col-md-12" style = {{textAlign: "center"}}>
          <h3>Add New Note</h3>
          <NoteForm submitNote={this.submitNote.bind(this)}/>
        </div>
        {this.renderSettings()}
        <div className="col-md-12" style = {{border: "3px solid black"}}>
          <h3 style = {{textAlign: "center"}}><u>My Saved Notes</u></h3>
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
