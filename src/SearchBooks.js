import React, {Component} from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })

    }

    componentDidUpdate(prevProps, prevState) {
        const {query} = this.state
        if (prevState.query !== query) {
            if (query) {
                BooksAPI
                    .search(query, 10)
                    .then((books) => {
                        if (books.error) {
                            this.setState({books: []});
                        } else {
                            for (const book of books) {
                                const bookFromBookshelf = this
                                    .props
                                    .books
                                    .filter(bookshelfBook => bookshelfBook.id === book.id)
                                if (bookFromBookshelf.length === 1) {
                                    console.log("set shelf from book " + book.title + " to " + bookFromBookshelf[0].shelf)
                                    book.shelf = bookFromBookshelf[0].shelf
                                } else {
                                    book.shelf = 'none'
                                }
                            }
                            this.setState({books})
                        }
                    })

            } else {
                this.setState({books: []})
            }
        }
    }

    render() {

        const {query, books} = this.state
        books.sort(sortBy('title'))
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                        {books.length > 0 && books.map((book) => (
                            <li key={book.id}>
                                <Book book={book} onChangeShelf={this.props.onChangeShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks