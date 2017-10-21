import React, {Component} from 'react'
import {Route} from 'react-router-dom'
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
        this.setState({books})

      })
  }

  changeShelf = (book, newShelf) => {
    
    BooksAPI.update(book, newShelf)
    const booksUpdate = this.state.books
    console.log(booksUpdate)
    
   for (let i = 0; i < booksUpdate.length; i++) {
      if(booksUpdate[i].id === book.id){
        booksUpdate[i].shelf = newShelf
        break
      }
    }
    this.setState({books: booksUpdate})

  }



  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (<ListBooks onChangeShelf={this.changeShelf} books={this.state.books}/>)}/>

        <Route
          path="/search"
          render={({history}) => (<SearchBooks books={this.state.books}/>)}/>
      </div>

    )
  }
}

export default BooksApp;
