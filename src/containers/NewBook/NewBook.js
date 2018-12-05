import React, { Component } from 'react';
import './NewBook.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class NewBook extends Component {
    state = {
        title: '',
        author: '',
        img_url: '',
        description: '',
        submitted: false

    }

    // postDataHandler = (e) => {
    //     e.preventDefault();
    //     const book = this.state;
    //     this.props.addBook(book);
    //     this.setState({
    //         title: '',
    //         author: '',
    //         img_url: '',
    //         description: '',
    //         submitted: true
    //     }) 
    // }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            submitted: true
        })
        this.props.dispatch({ type: "ADD_BOOK", payload: this.state })
      }

    handleChange = event => {
        this.setState({
          [event.target.ref]: event.target.value
        });
      }
   
    render() {
        let redirect = null;
        if (this.state.submitted){
            alert("Your book has been added!")
            redirect = <Redirect to="/" />
        }
        return(
            <div className="NewBook">
                {redirect}
                <h1>Add a Book</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input type="text" ref="title" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}/>
                    <label>Author</label>
                    <input type="text" ref="author" value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}/>
                    <label>Image URL</label>
                    <input type="text" ref="img_url" value={this.state.img_url} onChange={(event) => this.setState({img_url: event.target.value})}/>
                    <label>Description</label> 
                    <input type="text" ref="description" value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}/>
                    <button type="submit">Add Book</button>
                </form>
            </div>
        );
    }
};
// mapDispatchToProps = dispatch => {
//     return {
//       addBook: formData => dispatch({ type: "ADD_BOOK", payload: formData })
//     }
//   }
export default connect()(NewBook);