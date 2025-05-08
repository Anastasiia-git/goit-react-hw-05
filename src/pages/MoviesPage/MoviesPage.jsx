import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader"

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") ?? "";

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      if (!searchParam) {
        setMovies([]);
        setLoading(false);
        return;
      }
      try {
        const searchResults = await searchMovies(searchParam);
        setMovies(searchResults);
        setSearchQuery("");
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [searchParam]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
      e.currentTarget.reset();
    } else {
      toast.error("Please enter a search query.");
    }
  };

  return (
    <>
      <header className={s.box}>
        <Toaster position="top-left" reverseOrder={false} />
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            className={s.field}
            type="text"
            name="search"
            placeholder="Search movies"
            value={searchQuery}
            onChange={handleChange}
          />
          <button className={s.btn} type="submit">
            Search
          </button>
        </form>
      </header>
      <main>
        {loading ? (
          <Loader loading={loading} />
        ) : movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          searchParam && <p>Sorry, we didn't find anything😢</p>
        )}
      </main>
    </>
  );
}

export default MoviesPage;