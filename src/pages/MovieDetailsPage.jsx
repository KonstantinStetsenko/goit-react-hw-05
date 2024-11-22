import { useEffect, useRef, useState } from "react";
import {
  useParams,
  Outlet,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import { fetchFilmGalleryById } from "../../services/filmGallery-API";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { Suspense } from "react";
import Container from "./../../Container/Container"


const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [filmID, setFilmID] = useState(null);
  const location = useLocation();
  console.log(location);
  const goBackLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchFilmGalleryById(movieId);
      setFilmID(data);
    };
    getData();
  }, [movieId]);

  if (!filmID) {
    return <p>Загрузка...</p>; // Показать сообщение или лоадер, пока данные загружаются
  }
  let roundedNumber = parseFloat(filmID.vote_average.toFixed(1));

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  return (
    <Container>
      <Link to={goBackLink.current}>Go Back</Link>

      <div className={css.containerFilm}>
        <img
          src={
            filmID.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${filmID.poster_path}`
              : defaultImg
          }
          alt={filmID.overview}
          width={300}
        />
        <div>
          <h2 className={css.title}>{filmID.original_title}</h2>
          <h2 className={css.titleDate}>
            Date relise{" "}
            <span className={css.dateRelies}>{filmID.release_date}</span>
          </h2>
          <h2 className={css.titleDate}>
            User Score
            <span className={css.rating}>{`${roundedNumber * 10} % `}</span>
          </h2>

          <h2 className={css.titleDate}>overview</h2>
          <p className={css.overviev}>{filmID.overview}</p>
          <h2 className={css.titleDate}>genres</h2>
          <div className={css.listGenres}>
            {filmID.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </div>
        </div>
      </div>

      <nav className={css.conteinerLink}>
        <NavLink className={buildLinkClass} to="Cast">
          Cast
        </NavLink>
        <NavLink className={buildLinkClass} to="Reviews">
          Reviews
        </NavLink>
      </nav>
      <Suspense fallback={"Loading....."}>
        <Outlet />
      </Suspense>
    </Container>
  );
}
