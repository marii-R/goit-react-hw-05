import css from './HomePage.module.css';
import { useState, useEffect } from 'react';
import { fetchTrendingMovie } from '../../api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getMovies() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchTrendingMovie();
                setMovies(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getMovies();
    }, []);

    return (
        <div className={css.container}>
            <h1 className={css.title}>Currently Trending Movies</h1>
            {isLoading && <b>Loading movies...</b>}
            {error && <b>There was an error, please reload the page...</b>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}