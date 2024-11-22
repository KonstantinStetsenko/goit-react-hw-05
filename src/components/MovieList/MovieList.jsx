import { fetchFilmGallery } from "../../../services/filmGallery-API";
import App from "../../App";
import { useState} from "react";
import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

export default function MovieList({ films }) {
  {
    const location = useLocation()
    return (
      <div className={css.container}>
        <ul className={css.gridContainer}>
          {films.map((film) => (
            <li key={film.id}>
              <Link to={`/movies/${film.id.toString()}`} state={location}>
                <div className={css.cardContainer}>
                  <div className={css.containerImg}>
                    <img
                      src={
                        film.poster_path
                          ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                          : defaultImg
                      }
                      alt={film.original_title}
                      width={140}
                    />
                  </div>

                  <h3 className={css.textList}>{film.original_title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
