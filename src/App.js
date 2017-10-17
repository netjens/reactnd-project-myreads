import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
     BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }




  render() { 
    return (
      <div className="app">
        <Route exact path="/" render={() => (

          <ListBooks
            books={this.state.books} />
        )} />

        <Route path="/search" 
          render={({history})=>(
            <SearchBooks books={this.state.books} 
        
         />
          )}/>
      </div>


    )
  }
}

export default BooksApp;
