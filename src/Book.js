import React, { Component } from 'react';

class Book extends Component {

    state = {
        bookshelf: 'currentlyReading'
    }

    handleListChange = (e) => {
        console.log(e)
        this.setState({bookshelf: e.target.value})
    }

    render() {
        const {backgroundImage,title,author } = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImage})`}}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleListChange} defaultValue={this.state.bookshelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>


        )
    }
} 

export default Book