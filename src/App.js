import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard.jsx";

import './App.css';
import SearchIcon from './search.svg';


const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=93522e73"


const App = () => {
    const [movies, setMovies] = useState();
    const [search, setSearch] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('Doctor Who');
    }, []);

    return (
        <div className="app">
            <h1>Movies and Shows</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies.."
                    value={search}
                    // 'e' is the event
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown = {(e) => {
                            if (e.key === 'Enter') {
                                searchMovies(search)
                            }
                          }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(search)}
                />
            </div>
            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;