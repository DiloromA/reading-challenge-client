import React, { Component } from 'react';
import './Books.css';
import Book from '../../../components/Book/Book';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import FullBook from '../FullBook/FullBook';
import BookService from '../../../services/BookService';
import NewBook from '../NewBook/NewBook';


class Books extends Component {
	state = {
		allBooks: []
	}

	componentDidMount() {
		BookService.fetchBooks().then(allBooks => this.setState({allBooks})
	)}
	
	
	bookSelectedHandler = (id) => {
		this.props.history.push({pathname:'/books/' + id});
		//this.props.history.push('/' + id);
	}

	addBook = book => {
		BookService.createBook(book).then(book => this.setState({
			allBooks: this.state.allBooks.concat(book)
		}))
	}
	render(){
		console.log(this.state)
			
		let allBooks = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
		if (!this.state.error) {
			allBooks = this.state.allBooks.map(book => {
				return(
				<Link to={"/books/" + book.id} key={book.id} >
					 <Book
						title={book.title} 
						author={book.author}
						img_url={book.img_url}
						description={book.description}
					clicked={() => this.bookSelectedHandler(book.id)} />
				</Link>

				);
			});
		}

		// let fullBooks;
		// if (this.bookSelectHandler) {
		// 	fullBooks = this.state.allBooks.map(book => {
		// 		return(
		// 			<FullBook 
		// 			title={book.title} 
		// 			author={book.author}
		// 			img_url={book.img_url}
		// 			description={book.description}
		// 			/>
		// 	);
		// 	});
		// }

		return (
			<div>
				<section className="Books">
					{allBooks}				
				</section>
				<section className="FullBooks">
				{/* <Route path={this.props.match.url + '/:id'} render={(props) => <FullBook {...props} books={fullBooks} />} /> */}
					<Route path={this.props.match.url + '/:id'} render={(props) => <FullBook books={this.state.allBooks} />} /> 
				</section>
				<NewBook addBook={this.addBook} />
			</div>
		);
		// how do I get to the exact route, so that full page does not show up in books page, until I click on a book -- 
		//exact component={FullBook}
	}
};

export default Books;