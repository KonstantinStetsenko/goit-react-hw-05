import MovieList from "../components/MovieList/MovieList";
import Container from "./../../Container/Container"

export default function HomePage({ films }) {
    return <Container>
    <MovieList films={films} />
    </Container>
}