import css from './MovieCast.module.css';
import { fetchMoviesCast } from "../../api";
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";

export default function MovieCast() {
    const { movieId } = useParams();

    const [casts, setCasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getCast() {
          try {
            setIsLoading(true);
            setError(false);
            const data = await fetchMoviesCast(movieId);
            setCasts(data);
          } catch {
            setError(true);
          } finally {
            setIsLoading(false);
          }
        }
        getCast();
    }, [movieId]);

    return (
        <div className={css.container}>
            {isLoading && <b>Loading...</b>}
            {error && <b>Error, please reload the page...</b>}

            <ul className={css.list}>
                {casts.map((cast) => (
                    <li key={cast.id} className={css.item}>
                        <img className={css.img}
                            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                            alt={cast.name}
                            
                        />
                        <p className={css.text}>
                            {cast.name} as {cast.content}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
        
    
}