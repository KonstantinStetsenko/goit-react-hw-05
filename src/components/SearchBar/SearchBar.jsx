import { Formik, Form, Field } from "formik";
import { fetchFilmGallerySearch } from "./../../../services/filmGallery-API";

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
    <>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field name="query" placeholder="Search film ..." />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </>
  );
}
