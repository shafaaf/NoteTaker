import React from 'react';
import { connect } from 'react-redux';
import BookForm from './BookForm';
import { Link } from 'react-router';
import * as noteActions from '../../actions/noteActions';

class Book extends React.Component{
  constructor(props){
    super(props);
  }
  
  submitBook(input){
    this.props.createBook(input);
  }

  render(){
    let titleInput;
    // return(
    //   <div className="row">
    //     <div className="col-md-6">
    //       <h3>Books</h3>
    //       <table className="table">
    //         <thead>
    //           <th>
    //             <td>Title</td>
    //             <td></td>
    //           </th>
    //         </thead>
    //         <tbody>
    //         {this.props.books.map((b, i) => 
    //           <tr key={i}>
    //             <td>{b.title}</td>
    //             <td><Link to={`/books/${b.id}`}>View</Link></td>
    //         </tr> )}
    //         </tbody>
    //       </table>
    //     </div>
    //     <div className="col-md-6">
    //       <h3>New Book</h3>
    //       {/* Import and inject Book form */}
    //      <BookForm submitBook={this.submitBook.bind(this)}/>
    //     </div>
    //   </div>
    // );
    return (<h1>Hii</h1>)
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.books
    books: state.books
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // You can now say this.props.createBook
    createBook: book => dispatch(noteActions.createNote(book))

    // actions: {
    //   createBook: book => dispatch(bookActions.createBook(book))
    //   fetchBooks:  dispatch(bookActions.getBooks())
    // }
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Book);
