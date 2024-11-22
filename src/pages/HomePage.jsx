import MovieList from "../components/MovieList/MovieList";
import Container from "./../../Container/Container";
import { useEffect, useState } from "react";
import { fetchFilmGallery } from "../../services/filmGallery-API";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    async function getFilms() {
      try {
        const data = await fetchFilmGallery();
        setFilms(data.results);
      } catch (error) {
        setStatus(error.response ? error.response.status : "No response");
      }
    }

    getFilms();
  }, []);

  return (
    <Container>
      <MovieList films={films} />
    </Container>
  );
}
