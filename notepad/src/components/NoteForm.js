import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col, Button, Checkbox } from 'react-bootstrap';
import { ButtonInput } from 'react-bootstrap';

let titleInput, descriptionInput = null;

class NoteForm extends React.Component{
  constructor(props){
    super(props);
    this.title = null;
    this.description = null;
  }

  onClickSubmit(){
    console.log("onClickSubmit called.");
    console.log("title is: ", this.title);
    console.log("description is: ", this.description);
    var input = {
      title: this.title,
      description: this.description
    };
    this.props.submitNote(input);
  }

  titleChange(e){
    var title = e.target.value;
    // console.log("titleChange called. title is: ", title);
    this.title = title;
  }
  
  descriptionChange(e){
    var description = e.target.value;
    // console.log("descriptionChange called. description is: ", description);
    this.description = description;
  }

  render(){
    return (
      <div style = {{textAlign: "center"}}>
        <Form horizontal style = {{textAlign: "center", margin: "0 auto"}}>
          <FormGroup controlId="formHorizontalEmail" style = {{textAlign: "center", margin: "0 auto"}}>
            <Col componentClass={ControlLabel} sm={3}>
              Title
            </Col>
            <Col sm={6}>
              <FormControl type="email" placeholder="Enter text" onChange={this.titleChange.bind(this)}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" style ={{marginTop: "20px"}}>
            <Col componentClass={ControlLabel} sm={3}>
              Description
            </Col>
            <Col sm={6}>
               <FormControl componentClass="textarea" rows="4" placeholder="Enter text" onChange={this.descriptionChange.bind(this)}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col>
              <Button bsStyle="primary" onClick = {this.onClickSubmit.bind(this)}>Submit Note!</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default NoteForm;
