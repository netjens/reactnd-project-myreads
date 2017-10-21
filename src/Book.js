import React, {Component} from 'react';

class Book extends Component {

    handleListChange = (e) => {

        this
            .props
            .onChangeShelf(this.props.book, e.target.value)

    }

    render() {
        const {title, authors, shelf} = this.props.book
        const backgroundImage = this.props.book.imageLinks !== undefined
            ? this.props.book.imageLinks.thumbnail
            : ''
        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${backgroundImage})`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleListChange} defaultValue={shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
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