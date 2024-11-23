import { Formik, Form, Field } from "formik";
import { fetchFilmGallerySearch } from "./../../../services/filmGallery-API";
import css from "./SearchBar.module.css"
import Container from "../../../Container/Container";




export default function SearchBar({ handleSetQuery}) {
  const handleSubmit = (values, options) => {
    fetchFilmGallerySearch();
    console.log(values);
    handleSetQuery(values.query);
    options.resetForm();
  };
  const initialValues = {
    query: "",
  };
  return (
    <Container>
      <Formik className={css.formContainer } onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={css.formSearch}>
          <Field className={ css.inputSearch} name="query" placeholder="Search film ..." />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </Container>
  );
}
