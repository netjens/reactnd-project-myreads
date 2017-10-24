import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SHELF from './ShelfConsants'


const ListBooks = (props) => {

    const { books, onChangeShelf } = props

    return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf books={books} onChangeShelf={onChangeShelf} shelf={SHELF.CURRENTLY_READING} />
                    <Bookshelf books={books} onChangeShelf={onChangeShelf} shelf={SHELF.WANT_TO_READ} />
                    <Bookshelf books={books} onChangeShelf={onChangeShelf} shelf={SHELF.READ} />
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )

}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default ListBooks