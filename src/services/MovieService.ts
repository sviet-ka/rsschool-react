export interface Movie {
  title: string;
  id: number;
  overview: string;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '395bf1c800be4800da299bee1ad43f6a';

const searchMovies = async (searchString: string): Promise<Movie[]> => {
  const url = searchString
    ? `${BASE_URL}/search/movie?query=${searchString}&api_key=${API_KEY}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  await new Promise((r) => setTimeout(r, 2000));
  const response = await fetch(url);
  const res = await response.json();
  return res.results;
};

export { searchMovies };
