import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetail } from "../../services/api";
import { IMG_BASE_URL } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState({});
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await getDetail(movieId);
        setMovies(data);
        if (data && data.genres) {
          setGenres(data.genres);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <>
      <div className={s.backBox}>
        <Link className={s.back} to={goBackRef.current}>
          Go back
        </Link>
      </div>
      <div className={s.box}>
        <div className={s.smallBox}>
          <p className={s.title}>{movies.title}</p>
          <p className={s.data}>Release date</p>
          <span className={s.span}>{movies.release_date}</span>
          <div className={s.overBox}>
            <p className={s.data}>Overview</p>
            <span className={s.span}>{movies.overview}</span>
          </div>
          <div>
            <p className={s.data}>Genres</p>
            <ul className={s.genresBox}>
              {genres.map((genre) => (
                <li key={genre.id} className={s.span}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {movies.backdrop_path && (
          <img
            className={s.img}
            src={`${IMG_BASE_URL}${movies.backdrop_path}`}
            alt={movies.title}
          />
        )}
      </div>
      <div className={s.infoBox}>
        <p className={s.titleInfo}>Additional information</p>
        <nav className={s.nav}>
          <NavLink className={s.cast} to="cast">
            Cast
          </NavLink>
          <NavLink className={s.cast} to="reviews">
            Reviews
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default MovieDetailsPage;
