import React from 'react';

const NoteForm = (props) => {
    let titleInput, descriptionInput = null;
    return (
      <form 
        onSubmit={e => {
          e.preventDefault();
          var input = {
            title: titleInput.value,
            description: descriptionInput.value              
          };
          props.submitBook(input);
          e.target.reset();
        }}
        className="form-horizontal">
        <div className="input-group">
          <label className="col-sm-2 control-label">Title: </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="title"
              ref={node => titleInput = node}
              className="form-control" />
          </div>
        </div>
        <br/>
        <div className="input-group">
          <label className="col-sm-2 control-label">description: </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="description"
              ref={node => descriptionInput = node}
              className="form-control" />
          </div>
        </div>
        <br/>
        <div className="input-group">
          <div className="col-sm-offset-2 col-sm-10">
            <input type="submit" className="btn btn-default"/>
          </div>
        </div>
      </form>
    );
};

export default NoteForm;
