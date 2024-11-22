import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFilmGalleryReviews } from "./../../../services/filmGallery-API";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchFilmGalleryReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [movieId]);

  if (!reviews.results) {
    return <p>Загрузка...</p>; // Показать сообщение или лоадер, пока данные загружаются
  }
 
  if (reviews.results.length === 0) {
    return <p>No reviews found.</p>;
  }

  return (
    <>
      <h3>Reviews</h3>
      {error && <p className={css.error}>{error}</p>}
      {reviews.results.map((result) => (
        <li key={result.id}>
          <img
            src={
              result.author_details.avatar_path
                ? `https://image.tmdb.org/t/p/w200${result.author_details.avatar_path}`
                : defaultImg
            }
            alt={result.username}
            width={100}
          />
          <h4>Autor:{result.author}</h4>
          <h5>Rating:{result.author_details.rating}</h5>
          <h5>Published:{result.created_at}</h5>
          <p>{result.content}</p>
        </li>
      ))}

      <h4></h4>
    </>
  );
}
