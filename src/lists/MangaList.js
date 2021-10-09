import React, { Component } from 'react';
import './../App.css';
const jikanjs = require('jikanjs');

class MangaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mymanga: []
        };
    }

    componentDidMount() {
        jikanjs.loadUser('chrisfernandes18', 'mangalist').then(response => {
            return this.setState({
                mymanga: response.manga
            });
        }).catch(error => console.log(error));
        
    }
    render() {
        return(
            <div className="anime-list-container">
                <h1>My Manga List</h1>
                <div className="anime-manga-container">
                    {this.state.mymanga.map(book => {
                        let read = '';
                        if (book.publishing_status === 1 && book.total_chapters === 0) {
                            read = read.concat("Read ", book.read_chapters, " of ? chapters");
                        } else {
                            read = read.concat("Read ", book.read_chapters, " of ", book.total_chapters, " chapters");
                        }
                        let volumes = '';
                        if (book.publishing_status === 1 && book.total_volumes === 0) {
                            volumes = volumes.concat("Read ", book.read_volumes, " of ? volumes");
                        } else {
                            volumes = volumes.concat("Read ", book.read_volumes, " of ", book.total_volumes, " volumes");
                        }
                        let score = ''.concat("Score: ", book.score, "/10");
                        return (
                            <div className="anime-manga-card" key={book.mal_id}>
                                <a href={book.url}>
                                    <img src={book.image_url} alt="Show Cover"></img>
                                </a>
                                <p>{book.title}</p>
                                <div className="layer-slidedown">
                                    <div className="layer-slidedown-text">{book.reading_status === 1?"Currently reading.":book.reading_status === 2? "Completed.": "Plan to read."}</div>
                                    <div></div>
                                    <div className="layer-slidedown-text">{read}</div>
                                    <div></div>
                                    <div className="layer-slidedown-text">{volumes}</div>
                                    <div></div>
                                    <div className="layer-slidedown-text">{score}</div>
                                    <div></div>
                                    <div className="layer-slidedown-text"><a href={book.url} >{"MAL Link"}</a></div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        );
    }

}

export default MangaList;