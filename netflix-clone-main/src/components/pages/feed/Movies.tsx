import React from "react";
import { useRecoilValue } from "recoil";

import { movieAtom } from "../../../utils/recoil-atoms/movieAtom";
import MovieRow from "./MovieRow";

const Movies: React.FC = () => {
  const {
    trending,
    netflixOriginals,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    trendingTV,
    popularTV,
    topRatedTV,
  } = useRecoilValue(movieAtom);

  return (
    <section className="mt-[-30px] pb-5 md:pb-16 space-y-8 bg-[#111] z-50 px-5 no-scrollbar">
      <MovieRow title="" movies={trending} />
      <MovieRow title="Netflix Originals" movies={netflixOriginals} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Action Movies" movies={actionMovies} />
      <MovieRow title="Comedy Movies" movies={comedyMovies} />
      <MovieRow title="Horror Movies" movies={horrorMovies} />
      <MovieRow title="Romance Movies" movies={romanceMovies} />
      <MovieRow title="Documentaries" movies={documentaries} />
      <MovieRow title="Trending TV Shows" movies={trendingTV} />
      <MovieRow title="Top Rated TV Shows" movies={topRatedTV} />
      <MovieRow title="Popular TV Shows" movies={popularTV} />
    </section>
  );
};

export default Movies;
