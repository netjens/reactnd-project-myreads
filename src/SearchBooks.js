import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

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
        console.log('component did update')
        if (prevState.query !== query) {
            console.log('update the state')
            if (query) {
                BooksAPI
                    .search(query, 10)
                    .then((books) => {
                        this.setState({books})
                    })
            }else{
                this.setState({books : []})
            }
        }
    }

    render() {

        const {query, books} = this.state
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
                                <Book
                                    backgroundImage={book.imageLinks != undefined ? book.imageLinks.thumbnail : ''}
                                    author={book.author}
                                    title={book.title}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks