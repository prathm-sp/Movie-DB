import MovieCard from "@/components/MovieCard";
import SearchBarWithButton from "@/components/SearchBarWithButton";
import React, { useEffect, useState } from "react";

function HomePage() {
  const [movies, setMovies]: any = useState([]);
  const [emptyMoviesMsg, setEmptyMoviesMsg]: any = useState(
    "Search for a movie..."
  );

  function onClickSearch(searchValue = "") {
    if (searchValue && searchValue.length > 0) {
      fetch(`/api/getMoviesByKeyword`, { headers: { keyword: searchValue } })
        .then(async (res) => {
          const _res = await res.json();
          if (_res?.data?.results?.length) {
            setMovies([..._res.data.results]);
            let favMovies: any = {};
            _res.data.results.forEach((m: any) => {
              favMovies[m.id] = false;
            });
            const prevMovies = JSON.parse(
              localStorage.getItem("fav-movies") || "{}"
            );
            if (prevMovies && Object.keys(prevMovies).length) {
              favMovies = { ...favMovies, ...prevMovies };
              localStorage.setItem("fav-movies", JSON.stringify(favMovies));
            } else {
              localStorage.setItem("fav-movies", JSON.stringify(favMovies));
            }
          } else {
            setEmptyMoviesMsg("No movies found for...");
          }
        })
        .catch((err) => {
          setEmptyMoviesMsg("No movies found for the given search");
        });
    }
  }

  return (
    <div>
      <SearchBarWithButton onClickSearch={onClickSearch} />
      {movies?.length ? (
        <div className="p-8 bg-amber-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {movies.map((movie: any, index: number) => (
              <div
                key={`movie-${index}`}
                className="p-4 rounded-md flex items-center justify-center"
              >
                <MovieCard
                  title={movie.title}
                  poster={movie.poster_path}
                  description={movie.overview}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  movieId={movie.id}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>{emptyMoviesMsg}</h1>
      )}
    </div>
  );
}

export default HomePage;
