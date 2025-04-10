import css from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';



export default function MovieList({ movies }) {
    const location = useLocation();

  return (
    <div className={css.containerMovies}>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <div className={css.containerImg}>
             <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            /> 
            </div>
            <Link to={`/movies/${movie.id}`} state={ location } className={css.link}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

}