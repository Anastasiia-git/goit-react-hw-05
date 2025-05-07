import s from "./MovieList.module.css"
import { Link, useLocation} from "react-router-dom";
import { IMG_BASE_URL } from "../../services/api";

function MovieList({ movies }) {
  const location = useLocation()
  
  if (!movies) {
    return null;
  }

  return (
    <ul className={s.bigBox}>
      {movies.map((movie) => (
        <li className={s.posterWraper} key={movie.id}>
          <Link className={s.box} state={location} to={`/movies/${movie.id}`}>
            <h3 className={s.title}>{movie.title}</h3>
            <img
              className={s.poster}
              src={`${IMG_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;