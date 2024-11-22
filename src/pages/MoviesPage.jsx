import css from "./../pages/MoviesPage.module.css";
import { lazy } from "react";

import { useState, useEffect } from "react";
// import SearchBar from "../components/SearchBar/SearchBar";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchFilmGallerySearch } from "../../services/filmGallery-API";
import Container from "./../../Container/Container";
import MovieList from "../components/MovieList/MovieList";

const SearchBar = lazy(() => import("../components/SearchBar/SearchBar"));

export default function MoviesPage() {
  const [films, setFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  console.log(location);
  const query = searchParams.get("query") ?? "";
  useEffect(() => {
    if (query) {
      const searchFilms = async () => {
        try {
          const data = await fetchFilmGallerySearch(query);
          setFilms(data.results);
        } catch (error) {
          console.error(error);
        }
      };
      searchFilms();
    }
  }, [query]);

  const filteredFilms = films.filter((film) =>
    film.original_title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSetQuery = (newValue) => {
    searchParams.set("query", newValue);
    setSearchParams(searchParams);
  };

  // const defaultImg =
  //   "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <Container>
      <h2>Filter films</h2>
      <SearchBar handleSetQuery={handleSetQuery} />
      <MovieList films={films} />
    </Container>
  );
}
