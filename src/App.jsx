import './App.css'
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePages from "./pages/HomePages/HomePages";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MovieCast from "./components/MovieCast/MovieCast"
import MovieReviews from "./components/MovieReviews/MovieReviews";

import Navigation from "./components/Navigation/Navigation";


function App() {  
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App
