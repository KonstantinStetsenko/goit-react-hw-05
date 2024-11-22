import axios from "axios";

const BASE_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmNkMzUwZDZkMWE5ZDcyNjYwYmUzNWE0MDdhZDM4YyIsIm5iZiI6MTczMTg4MzIzNy44MzU0NjU3LCJzdWIiOiI2NzNhNmZlZmQxN2Q1YzM0ZmJlZWU3ZjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YfsPFtMSOUjYaWpQEgKgiwquUiJVns-X3FtuW57gyJQ";
const options = { headers: { Authorization: `Bearer ${API_TOKEN}` } };

export async function fetchFilmGallery() {
  try {
    const response = await axios(BASE_URL, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// fetchFilmGallery();

export async function fetchFilmGalleryById(id) {
  let BASE_URL_ID = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  try {
    const response = await axios(BASE_URL_ID, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return;
}
// fetchFilmGalleryById(567567);

export async function fetchFilmGalleryCredits(id) {
  let BASE_URL_ID = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  try {
    const response = await axios(BASE_URL_ID, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return;
}
// fetchFilmGalleryCredits(1100782);

export async function fetchFilmGalleryReviews(id) {
  let BASE_URL_ID = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`;
  try {
    const response = await axios(BASE_URL_ID, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return;
}

export async function fetchFilmGallerySearch(query) {
  let BASE_URL_ID = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  try {
    const response = await axios(BASE_URL_ID, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return;
}
// fetchFilmGallerySearch();
