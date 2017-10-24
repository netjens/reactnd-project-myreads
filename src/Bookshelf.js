import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types'

const Bookshelf = (props) => {

    return(

    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelf.title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props
                    .books
                    .filter((book) => (book.shelf === props.shelf.value))
                    .map((book) => (
                        <li key={book.id}>
                            <Book onChangeShelf={props.onChangeShelf} book={book}/>
                        </li>
                    ))}
            </ol>
        </div>
    </div>

)}

Bookshelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default Bookshelf
