import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BookDetails from './BookDetails'
import * as bookActions from '../../actions/bookActions';


class BookDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        console.log("BookDetailsPage: componentDidMount running.");
        this.props.fetchBookById(this.props.params.id);
    }

    render() {
        return (
            <div>
                <h1>Book Details Page</h1>
                <BookDetails book={this.props.book}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // state mappings here
        book: state.book
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // This dispatch will trigger 
        // the Ajax request we setup
        // in our actions
        fetchBookById: bookId => dispatch(bookActions.fetchBookById(bookId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);
