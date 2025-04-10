import css from './MovieReviews.module.css';
import { fetchMoviesReviews } from '../../api';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MoviesReviews() {
     const { movieId } = useParams();
    
        const [reviews, setReviews] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(false);
    
        useEffect(() => {
            async function getReviews() {
              try {
                setIsLoading(true);
                setError(false);
                const data = await fetchMoviesReviews(movieId);
                setReviews(data);
              } catch {
                setError(true);
              } finally {
                setIsLoading(false);
              }
            }
            getReviews();
        }, [movieId]);
    
    return (
            <div className={css.container}>
                {isLoading && <b>Loading...</b>}
                {error && <b>Error, please reload the page...</b>}
    
                <div className={css.list}>
                  {reviews.length ? (
                    reviews.map((review) => (
                      <div key={review.id} className={css.item}>
                        <h3 className={css.name}>{review.author}</h3>
                        <p className={css.text}>{review.content}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet</p>
                  )}
                </div>
            </div>
        );

}