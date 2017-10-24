import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({ books })

      })
  }

  changeShelf = (book, newShelf) => {

    BooksAPI.update(book, newShelf).then((response) => {
      book.shelf = newShelf
      this.setState({ books: this.state.books.filter((b) => b.id !== book.id).concat(book) });
    })
  }


  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (<ListBooks onChangeShelf={this.changeShelf} books={this.state.books} />)} />

        <Route
          path="/search"
          render={({ history }) => (<SearchBooks books={this.state.books} onChangeShelf={this.changeShelf} />)} />
      </div>

    )
  }
}

export default BooksApp;
