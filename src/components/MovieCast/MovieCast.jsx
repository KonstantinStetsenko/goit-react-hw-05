import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFilmGalleryCredits } from "./../../../services/filmGallery-API";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [castID, setCastID] = useState([]);
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchFilmGalleryCredits(movieId);
        setCastID(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [movieId]);

  if (!castID.cast) {
    return <p>Загрузка...</p>; // Показать сообщение или лоадер, пока данные загружаются
  }
 if (castID.cast.length === 0) {
    return <p>No cast found.</p>;
  }
  return (
    <div>
      <h3>Cast</h3>
      <ul className={css.ListCast}>
        {castID.cast.map((cast) => (
          <li className={css.listCast} key={cast.id}>
            <div className={css.photoArtists}>  <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                  : defaultImg
              }
              alt={cast.name}
              width={150}
            /></div>
          
            <h4 className={css.titleName}>{cast.name} </h4>
          </li>
        ))}
      </ul>
    </div>
  );
}
