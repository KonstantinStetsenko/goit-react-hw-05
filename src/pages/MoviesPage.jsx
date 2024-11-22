import css from "./../pages/MoviesPage.module.css";
import { lazy } from "react";

import { useState, useEffect } from "react";
// import SearchBar from "../components/SearchBar/SearchBar";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchFilmGallerySearch } from "../../services/filmGallery-API";
import Container from "./../../Container/Container"

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

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <Container>
      <h2>Filter films</h2>
      <SearchBar handleSetQuery={handleSetQuery} />
      <div className={css.container}>
        <ul className={css.gridContainer}>
          {filteredFilms.map((film) => (
            <li className={css.listSearch } key={film.id}>
              <Link to={`/movies/${film.id.toString()}`} state={location}>
                <div className={css.containerImg}>
                  <img
                    src={
                      film.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                        : defaultImg
                    }
                    width={200}
                  />
                </div>

                <h3 className={css.textList}>{film.original_title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
