import React from 'react';
import './App.css';

function Blog(props) {
    return (
        <div>
            <h1>Blog</h1>
            <div>
                Blogs coming soon.
            </div>
                <div className="project-cards-container">
                    <a href="blank_">Home
                        <div className="card-container">
                            <h3>Command Line MAL</h3>
                            <p>Search MyAnimeList.net from the command line and save searches into a csv file.</p>
                            <div className="tech-container">
                                <hl>
                                    Python
                                </hl>
                            </div>
                            <div className="bottom"></div>
                        </div>
                    </a>
                </div>
        </div>
    )
}

export default Blog;