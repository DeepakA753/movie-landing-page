import { useEffect, useState } from 'react';

import './App.css';
import MovieCard from './MovieCard';


//API Key - 8972149e

const API_URL: string = 'http://www.omdbapi.com?apikey=8972149e';

export interface MovieProps {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}


// const movie1: MovieProps =
// {
//     "Title": "The Amazing Spiderman 2 Webb Cut",
//     "Year": "2021",
//     "imdbID": "tt18351128",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg"
// }


const App = () => {

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [ready, setReady] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        searchMovies("Batman");
    }, []);


    const searchMovies = async (title: string) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data.Search);
        setMovies(data.Search)
        setReady(true)
        // console.log(movies)

    }
    console.log(movies[0])


    return (
        <div className='app'>
            <h1>Movie Land</h1>

            <div className='search'>
                <input placeholder='Search for Movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value) } />
                <svg onClick={() => searchMovies(searchTerm) } width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.8594 29.8594L39.4219 39.4219" stroke="#D88769" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.9062 33.0469C26.2682 33.0469 33.0469 26.2682 33.0469 17.9062C33.0469 9.54431 26.2682 2.76562 17.9062 2.76562C9.54431 2.76562 2.76562 9.54431 2.76562 17.9062C2.76562 26.2682 9.54431 33.0469 17.9062 33.0469Z" stroke="#D88769" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

            {
                movies.length > 0 ? (
                    <div className='container'>
                        {/* <MovieCard movie1={movie1} /> */}
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No Movies Found</h2>
                    </div>
                )
            }

            {/* <div className='container'>

                {ready && <MovieCard movie1={movies[0]} />}

                {ready ?
                    movies.map((movie) => (
                        <MovieCard movie1={movie} />
                    ))
                    : (
                        <h2>LOading...</h2>
                    )
                }
                <MovieCard movie1={movie1} />
            </div> */}
        </div>

    )
}

export default App;