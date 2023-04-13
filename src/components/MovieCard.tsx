import Image from "next/image";
import React, { useEffect, useState } from "react";

const isFavouriteMovie = (id: string) => {
  const movies = localStorage.getItem("fav-movies") || "";
  if (movies) {
    const _movies = JSON.parse(movies);
    return Boolean(_movies[id]);
  }
  return false;
};

const toggleFavMovieByMovieId = (movieId: string) => {
  const prevMovies = JSON.parse(localStorage.getItem("fav-movies") || "{}");
  if (prevMovies && Object.keys(prevMovies).length) {
    const currMovies = {
      ...prevMovies,
      [movieId]: !Boolean(prevMovies[movieId]),
    };
    localStorage.setItem("fav-movies", JSON.stringify(currMovies));
  } else {
    localStorage.setItem(
      "fav-movies",
      JSON.stringify({ [movieId]: !Boolean(prevMovies[movieId]) })
    );
  }
};

function MovieCard({
  poster,
  title,
  description,
  releaseDate,
  rating,
  movieId,
}: any) {
  const [showMore, setShowMore] = useState({
    open: false,
    text: "Show More",
  });
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(isFavouriteMovie(movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const toggleShowMore = () => {
    setShowMore({
      open: !showMore.open,
      text: showMore.open ? "Show More" : "Show Less",
    });
  };

  const onClickFavourite = () => {
    toggleFavMovieByMovieId(movieId);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="max-w-sm bg-white rounded overflow-hidden shadow-lg">
      <Image
        width={400}
        height={461}
        src={`https://image.tmdb.org/t/p/original${
          poster || "/jRf5Kk1ZbmvSfcguQ3hGPezmHwh.jpg"
        }`}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 line-clamp-1">{title}</div>
      </div>
      {showMore.open ? (
        <div className="px-6 pt-4 pb-2">
          <p className="text-gray-700 text-base line-clamp-2">
            {description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
          </p>
          <p className="font-bold">
            Release Date: <span className="font-normal">{releaseDate}</span>
          </p>
          <p className="font-bold">
            Rating: <span>{rating}</span>
          </p>
        </div>
      ) : null}

      <div className="flex justify-between px-6 pt-4 pb-2">
        <button
          onClick={toggleShowMore}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:outline-none"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-md group-hover:bg-opacity-0">
            {showMore.text}{" "}
          </span>
        </button>
        <button
          onClick={onClickFavourite}
          className={`relative dark:text-white focus:outline-none inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 ${
            isFavourite ? "orange-400 text-white" : ""
          } `}
        >
          <span
            className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-md ${
              isFavourite ? "bg-opacity-0" : ""
            }`}
          >
            Favourite
          </span>
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
