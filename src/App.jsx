import React, { use, useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import MoviesContainer from "./components/MoviesContainer";
import moviesapi from "./api/movies_api";
import { useDebounce } from "react-use";
const API_BASE_URL = " https://www.omdbapi.com/?apikey=";
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [Searchiteam, setSearchiteam] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedSearchiteam , setedebouncedSearchiteam ] = useState(); // this debounced for not spaming api it will wait 5s the it give user type data to api 

  useDebounce(() => setedebouncedSearchiteam(Searchiteam) , 500 , [Searchiteam])

  // this is api fecting code :)

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);

    // handle the errors wil featching api datas

    try {
      const urlapi = query
        ? `${API_BASE_URL}${API_KEY}&s=${query}&page=1`
        : `${API_BASE_URL}${API_KEY}&s=movie&page=1`;
      console.log(urlapi);

      const response = await fetch(urlapi);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // this code covert api data into json data 

      const data = await response.json();
      console.log(data);

      if (data.Response === "false") {
        setError(data.Error);
        setMovies([]);
        return;
      }

      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchiteam);
  }, [debouncedSearchiteam]);

  return (
    <>
      <main>
        <div className="hero">
          <header>
            <h1>Find Movies You'll enjoy without the hassele</h1>
          </header>

          <section>
            <Search Searchiteam={Searchiteam} setSearchiteam={setSearchiteam} />
            <h1>All Movies</h1>

            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : movies && movies.length > 0 ? (
              <div className="movie-container">
                {movies.map(({ Poster, Title, Year, imdbID }) => (
                  <MoviesContainer
                    key={imdbID}
                    poster={Poster}
                    title={Title}
                    rate={Year}
                  />
                ))}
              </div>
            ) : (
              <h2>No movies found</h2>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default App;
