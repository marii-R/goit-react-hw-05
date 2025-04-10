import css from './MovieDetailsPage.module.css';
import { useParams, useLocation, NavLink, Outlet } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import { fetchMoviesById } from '../../api';
import { Suspense } from "react";


export default function MovieDetailsPage() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const location = useLocation();
    const backBtn = useRef(location.state?. from ?? '/');

    useEffect(() => {
        async function getMovie() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchMoviesById(movieId);
                setMovie(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getMovie();
    }, [movieId]);

    return (
       <div>
            {isLoading && <b>Loading...</b>}
            {error && <b>Error, please reload the page...</b>}
            <NavLink to={backBtn.current} className={css.backBtn}>
               ← Go back
            </NavLink>

            {movie && (
                <>
                <div className={css.container}>
                  <img
                    className={css.poster}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className={css.containerInfo}>
                    <h1 className={css.title}>{movie.title}</h1>
                    <ul className={css.movieInfo}>
                      <li className={css.listItem}>
                        <p>Overview: {movie.overview}</p>
                      </li>
                      <li className={css.listItem}>
                        <p>Release Date: {movie.release_date}</p>
                      </li>
                      <li className={css.listItem}>
                        <p>User Score: {movie.vote_average}</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={css.movieListLink}>
                  <h2>Additional information</h2>
                  <ul>
                    <li>
                      <NavLink to={`/movies/${movie.id}/cast`} state={location} className={css.listLink}>
                        Cast
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/movies/${movie.id}/reviews`} state={location} className={css.listLink}>
                        Reviews
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}

        <Suspense fallback={<b>Loading...</b>}>
          <Outlet />
        </Suspense>
      </div>
    );
}