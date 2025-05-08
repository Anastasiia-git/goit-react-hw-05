import { getReviews } from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState({});
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  const getMovieReviews = async () => {
    try {
      const data = await getReviews(movieId);
      setMovies(data);
      if (data && data.results) {
        setReviews(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getMovieReviews();
}, [movieId]);

  return (
    <>
      {reviews.length === 0 && <p>Sorry, but we don't have any reviews</p>}
      <div>
        <ul className={s.list}>
          {reviews.map((review) => (
            <li key={review.id} className={s.item}>
              <p className={s.author}>{review.author}</p>
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MovieReviews;
