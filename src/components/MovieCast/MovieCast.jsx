import { getCast } from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { IMG_BASE_URL } from "../../services/api";
import s from "./MovieCast.module.css"

function MovieCast() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState({});
  const [actors, setActors] = useState([]);
  const isFirstRender = useRef(true);

useEffect(() => {
  const getMovieCast = async () => {
    try {
     const data = await getCast(movieId);
     setMovies(data); 
     if (data && data.cast) {
       setActors(data.cast);
     }
    } catch (error) {
      console.log(error);
    }
  };
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }
  getMovieCast();
}, [movieId]);

  return (
    <>
      {actors.length === 0 && <p>Sorry, but we don't have any information</p>}
      <div>
        <ul className={s.list}>
          {actors.map((actor) => (
            <li key={actor.id} className={s.item}>
              <p className={s.name}>{actor.name}</p>
              <img
                className={s.img}
                src={`${IMG_BASE_URL}${actor.profile_path}`}
                alt={actor.name}
              />
              <p className={s.character}>{actor.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MovieCast