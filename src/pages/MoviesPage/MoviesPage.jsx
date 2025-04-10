import css from './MoviesPage.module.css';
import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMoviesByQuery } from '../../api';
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const [debounceQuery] = useDebounce(query, 300);

    const changeSearch = event => {
        const nextParams = new URLSearchParams(searchParams);

        if (event.target.value !== '') {
          nextParams.set('query', event.target.value);
        } else {
        nextParams.delete('query');
        }

        setSearchParams(nextParams);
    };

    useEffect(() => {
    async function getFilms() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesByQuery(debounceQuery);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getFilms();
    }, [debounceQuery]);
    
    return (
        <div className={css.containerSearch}>
            {isLoading && <b>Loading...</b>}
            {error && <b>Error, please reload the page...</b>}

            <input
                type='text'
                value={query}
                onChange={changeSearch}
                placeholder='Search movies...'
                className={css.input}
            />
      
            {movies.length === 0 ? <p className={css.message}> No movies for this query</p> : <MovieList movies={movies} />}
        </div>
  );
}