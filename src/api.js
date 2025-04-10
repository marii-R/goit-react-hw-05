import axios from 'axios';


const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2VlNjA4MmZmNjQxNjQ4OTZjNzc5ZWFjNjc4NmEwYyIsIm5iZiI6MTc0NDExMTI5OC41MzUsInN1YiI6IjY3ZjUwNmMyNzAxYjc1YmZlOWFjZmI5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GCruTOrMFIjg8mwEn9uzgHF3CvMXSnaK1nj09WDh26w";
const BASE_URL = "https://api.themoviedb.org/3/";

const options = () => ({
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
});

export const fetchTrendingMovie = async (page = 1) => {
    const response = await axios.get(`${BASE_URL}trending/movie/day`, {
      params: {page, language: 'en-US'},
      ...options(),
    });

    return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`${BASE_URL}search/movie`, {
    ...options(),
    params: { query },
  });
  return response.data.results;
};

export const fetchMoviesById = async (movieId) => {
  const response = await axios.get(`${BASE_URL}movie/${movieId}`, options());
  return response.data;
};

export const fetchMoviesCast = async (movieId) => {
  const response = await axios.get(`${BASE_URL}movie/${movieId}/credits`, options());
  return response.data.cast;
};

export const fetchMoviesReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}movie/${movieId}/reviews`, options());
  return response.data.results;
};







