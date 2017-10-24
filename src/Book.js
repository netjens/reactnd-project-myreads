import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SHELF from './ShelfConsants'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    handleListChange = (e) => {
        this
            .props
            .onChangeShelf(this.props.book, e.target.value)

    }

    render() {
        const { title, authors, shelf } = this.props.book
        const backgroundImage = this.props.book.imageLinks !== undefined
            ? this.props.book.imageLinks.thumbnail
            : ''
        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            backgroundImage: `url(${backgroundImage})`
                        }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleListChange} defaultValue={shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value={SHELF.CURRENTLY_READING.value}>Currently Reading</option>
                            <option value={SHELF.WANT_TO_READ.value}>Want to Read</option>
                            <option value={SHELF.READ.value}>Read</option>
                            <option value={SHELF.NONE.value}>None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors !== undefined
                    ? authors.join(', ')
                    : ''}</div>
            </div>

        )
    }
}

export default Book