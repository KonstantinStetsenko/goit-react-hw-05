import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { fetchFilmGallery } from "../services/filmGallery-API";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navigation from "./components/Navigation/Navigation";
// import MoviesPage from "./pages/MoviesPage";
// import NotFoundPage from "./pages/NotFoundPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
// import MovieCast from "./components/MovieCast/MovieCast";
// import MovieReviews from "./components/MovieReviews/MovieReviews";
// import HomePage from "./pages/HomePage";

const MoviesPage = lazy(() => import("./pages/MoviesPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))
const MovieDetailsPage  =lazy(()=>import( "./pages/MovieDetailsPage"))
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"))
const MovieReviews= lazy(() => import("./components/MovieReviews/MovieReviews"))
const HomePage = lazy(() => import("./pages/HomePage"))

function App() {
  // const [films, setFilms] = useState([]);
  // const [status, setStatus] = useState();

  // useEffect(() => {
  //   async function getFilms() {
  //     try {
  //       const data = await fetchFilmGallery();
  //       setFilms(data.results);
  //       console.log("РЕЗУЛЬТАТ:", data.results);
  //     } catch (error) {
  //       setStatus(error.response ? error.response.status : "No response");
  //     }
  //   }

  //   getFilms();
  // }, []);

  return (
    <>
      <Navigation />
      <Suspense fallback={"Loading....."}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/movies" element={<MoviesPage/>} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="Cast" element={<MovieCast />} />
            <Route path="Reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
