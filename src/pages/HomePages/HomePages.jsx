import { useState, useEffect, useRef } from "react";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import s from "./HomePages.module.css"

function HomePages() {
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const getTrendingData = async () => {
      setLoading(true);
      try {
        const trendingData = await getTrendingMovies();
        setHits(trendingData);
      } catch (err) {
        console.log(err.messege);
      } finally {
        setLoading(false);
      }
    };
     if (isFirstRender.current) {
       isFirstRender.current = false;
       return;
     }
    getTrendingData();
  }, []);

  return (
    <div>
      <h1 className={s.title}>Trending Today</h1>
      <MovieList movies={hits} />
      {loading && <Loader loading={loading} />}
    </div>
  );
}

export default HomePages;
