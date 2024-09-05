import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { API_OPTIONS, IMG_CDN_URL } from "../../utils/constants";
import { useRecoilValue } from "recoil";
import { movieSearchAtom } from "../../utils/recoil-atoms/movieSearchAtom";
import Loader from "../loader-ui/Loader";

interface MovieDetail {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
}

const Search: React.FC = () => {
  const moviesFromSearch = useRecoilValue(movieSearchAtom);
  const [movieDetails, setMovieDetails] = useState<MovieDetail[]>([]);

  const getSearchResults = async (query: string) => {
    try {
      // Create requests for movies and TV shows
      const movieRequest = axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false`,
        API_OPTIONS
      );
      const tvRequest = axios.get(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
          query
        )}&include_adult=false`,
        API_OPTIONS
      );

      // Execute both requests simultaneously
      const [movieResponse, tvResponse] = await Promise.all([
        movieRequest,
        tvRequest,
      ]);

      // Combine movie and TV show results
      const combinedResults = [
        ...(movieResponse.data.results || []),
        ...(tvResponse.data.results || []),
      ];
      return combinedResults;
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
      return [];
    }
  };

  useEffect(() => {
    if (moviesFromSearch && moviesFromSearch.length > 0) {
      Promise.all(moviesFromSearch.map((query) => getSearchResults(query)))
        .then((results) => {
          // Flatten the results as each search returns an array
          const combinedResults = results.flat();
          setMovieDetails(combinedResults);
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
    }
  }, [moviesFromSearch]);

  if (!moviesFromSearch || moviesFromSearch.length <= 0) {
    return <Loader />;
  } else {
    return (
      <div className="pt-20 p-5 min-h-screen bg-[#141414] text-white px-5">
        <h1 className="text-3xl mb-5">Here are your search results</h1>
        <div className="grid grid-cols-5 gap-4">
          {movieDetails.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={IMG_CDN_URL + movie.poster_path}
                alt={movie.title || movie.name}
                className="w-auto h-auto rounded transform hover:scale-105 transition duration-300 cursor-pointer"
              />
              <p className="mt-2 text-center text-sm">
                {movie.title || movie.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Search;
