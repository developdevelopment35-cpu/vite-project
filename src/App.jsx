import React, { use, useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import MoviesContainer from "./components/MoviesContainer";
import moviesapi from "./api/movies_api";
const API_BASE_URL = " https://www.omdbapi.com/?apikey=";
const API_KEY = import.meta.env.VITE_API_KEY;

console.log(API_BASE_URL + API_KEY);

const App = () => {
  const [Searchiteam, setSearchiteam] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL + API_KEY}&s=movie&page=10`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

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
    fetchMovies(Searchiteam);
  }, []);


  // this is ofline filtering api

  // const filteredMovies = moviesapi?.filter((movie) =>
  //   movie.title.toLowerCase().includes(Searchiteam.toLowerCase())
  // );

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

              {
                loading ? (
                  <h2>Loading...</h2>
                ) : error ? (
                  <h2>{error}</h2>
                ) : movies && movies.length > 0 ? (
                  <div className="movie-container">
                    {movies.map((movie, index) => (
                      <MoviesContainer
                        key={index}
                        poster={movie.Poster}
                        title={movie.Title}
                        rate={movie.Year}
                      />
                    ))}
                  </div>
                ) : (
                  <h2>No movies found</h2>
                )
              }

            {/* {filteredMovies && filteredMovies.length > 0 ? (
              <div className="movie-container">
                {filteredMovies.map((movie, index) => (
                  <MoviesContainer
                    key={index}
                    poster={movie.poster}
                    title={movie.title}
                    rate={movie.rating}
                  />
                ))}
              </div>
            ) : (
              <h2>No movies found</h2>
            )} */}
          </section>
        </div>
      </main>
    </>
  );
};

export default App;
