import React, { Component } from 'react';
import './../App.css';
import { timezone, removeTags } from '../Helpers';
const jikanjs  = require('jikanjs')


class AnimeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anime: [],
            season: "",
            seasonYear: 0,
            myanime: [],
            currDesc: ""
        };
    }

    componentDidMount() {
        const d = new Date();
        let y = 0;
        let s = "";
        y = d.getFullYear();
        const month = d.getMonth();
        if (month >= 0 && month <= 2) {
            s = "WINTER";
        } else if (month >= 3 && month <= 5) {
            s = "SPRING";
        } else if (month >= 6 && month <= 8) {
            s = "SUMMER";
        } else {
            s = "FALL";
        }
        let mal_ids = [];
        jikanjs.loadUser('chrisfernandes18', 'animelist').then(response => {
            //console.log(response.anime);
            response.anime.forEach(obj => {
                mal_ids.push(obj.mal_id);
            });
            return this.setState({
                myanime: response.anime
            });
        }).catch(error => console.log(error));
        this.getData(s, y).then(results => {
            return this.setState({
                anime: results,
                season: s,
                seasonYear: y 
            })
        }).catch(error => console.log(error));
    }

    getData(season, seasonYear) {
        const vars = {
            season: season,
            page: 1,
            perPage: 20,
            seasonYear: seasonYear,
        };
        let query = `
        query ($season: MediaSeason, $page: Int, $perPage: Int, $seasonYear: Int) {
            page: Page(page: $page, perPage: $perPage) {
                pageInfo: pageInfo {
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                }
                anime: media(season: $season, seasonYear: $seasonYear, sort:POPULARITY_DESC) {
                    title {
                        native
                        romaji
                        english
                    }
                    description
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year
                        month
                        day
                    }
                    coverImage {
                        extraLarge
                        large
                        medium
                        color
                    }
                    bannerImage
                    genres
                    startDate {
                        year
                        month
                        day
                    }
                    nextAiringEpisode {
                        airingAt
                        timeUntilAiring
                        episode
                    }
                    popularity
                    externalLinks {
                        id
                        url
                        site
                      }
                }
            }
        }
        `;
    
    
        let url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: vars
                })
            };
        let anime;
        anime = fetch(url, options).then(response => response.json())
                        .then(data => {
                            anime = data.data.page.anime;
                            return anime;
                        })
                        .catch(error => console.log(error));
        return anime;
    }

    render() {
        if (typeof this.state.anime === 'undefined') {
            return (
                <div className="anime-list-container">
                    <h1>Anime list</h1>
                    <div>
                        Could not load the information. Try reloading the page.
                    </div>
                </div>
            );
        } else {
            return (
                <div className="anime-list-container">
                    <h1>Anime List</h1>
                    <h2>Current {this.state.season} Anime {this.state.seasonYear}</h2>
                    <h4>Source: anichart.net</h4>
                    <div className="anime-manga-container">
                        {this.state.anime.map(show => {
                            const airing = show.nextAiringEpisode === null? "Completed": new Date(show.nextAiringEpisode.airingAt * 1000);
                            let time = "";
                            let filteredSites = show.externalLinks.filter(exlink => exlink.site === "Official Site");
                            if (filteredSites.length === 0) {
                                filteredSites = [{site: "No site."}];
                            }
                            if (airing === "Completed") {
                                time = "Finished Airing.";
                            } else {
                                time = time.concat('Airing at ', (airing.getMonth() + 1).toString(), '-', airing.getDate(), '-', airing.getFullYear(), ' at ', airing.getHours(), ':', airing.getMinutes() < 10? "0" + airing.getMinutes(): airing.getMinutes(), ' ', timezone());
                            } 
                            return (
                            <div className="anime-manga-card" key={show.title.native}>
                                <a href={filteredSites[0].site === "Official Site"?filteredSites[0].url:"/anime-list"}>
                                    <img src={show.coverImage.extraLarge} alt="Show Cover"></img>
                                </a>
                                <p>{show.title.romaji}</p>
                                <div className="layer-slidedown">
                                    <div className="layer-slidedown-text">{time}</div>
                                    <div className="layer-slidedown-text">{removeTags(show.description)}</div>
                                </div>
                            </div>
                            )
                        })} 
                    </div>
                    <h2>My Anime List</h2>
                    <h4>Source: myanimelist.net</h4>
                    <div className="anime-manga-container">
                        {this.state.myanime.map(show => {
                            let watched = '';
                            if (show.airing_status === 1 && show.total_episodes === 0) {
                                watched = watched.concat("Watched: ", show.watched_episodes, "/?");
                            } else {
                                watched = watched.concat("Watched: ", show.watched_episodes, "/", show.total_episodes);
                            }
                            let score = ''.concat("Score: ", show.score, "/10");
                            return (
                            <div className="anime-manga-card" key={show.mal_id}>
                                <a href={show.url}>
                                    <img src={show.image_url} alt="Show Cover"></img>
                                </a>
                                <p>{show.title}</p>
                                <div className="layer-slidedown">
                                    <div className="layer-slidedown-text">{show.watching_status === 1?"Currently watching.":show.watching_status === 2? "Completed.": "Plan to watch."}</div>
                                    <div></div>
                                    <div className="layer-slidedown-text">{watched}</div>
                                    <div></div>
                                    <div className="layer-slidedown-text">{score}</div>
                                    <div></div>
                                    <div className="layer-slidedown-text"><a href={show.url} >{"MAL Link"}</a></div>
                                </div>
                            </div>
                            )
                        })} 
                    </div>
                </div>
            );
        }
    }

}

export default AnimeList;