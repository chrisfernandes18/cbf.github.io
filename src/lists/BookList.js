import React, { Component } from 'react';
import booklist from '../assets/lists/booklist.json';
import './../App.css';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    sortJSON() { 
        /*
        console.log(booklist.Read.sort((a, b) => a.Author < b.Author));
        console.log(booklist.Read);
        */
    }

    render() {
        this.sortJSON()
        return (
            <div className="BookList">
                <h1>Book List</h1>
                <h2>Read</h2>
                <ul alt="Books I have read already">
                    {
                        booklist.Read.map(book => <li key={book.Title} className="list"><b>{book.Title}</b>{''.concat(" by: ", book.Author)}</li>)
                    }
                </ul>
                <h2>Want to Read</h2>
                <ul alt="Want to read">
                    {
                        booklist.Want_to_Read.map(book => <li key={book.Title} className="list"><b>{book.Title}</b>{''.concat(" by: ", book.Author)}</li>)
                    }
                </ul>
            </div>
        )
    }
}
export default BookList;