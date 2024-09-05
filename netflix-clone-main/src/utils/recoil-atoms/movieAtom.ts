import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title?: string;
  name?: string;
  overview: string;
  vote_average: number;
  media_type: string;
}

interface MovieArray {
  trending: Movie[];
  netflixOriginals: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  trendingTV: Movie[];
  topRatedTV: Movie[];
  popularTV: Movie[];
}

const { persistAtom } = recoilPersist({
  key: "recoil-movie-persist",
  storage: sessionStorage,
});

export const movieAtom = atom<MovieArray>({
  key: "movieState",
  default: {
    trending: [],
    netflixOriginals: [],
    topRated: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: [],
    trendingTV: [],
    topRatedTV: [],
    popularTV: [],
  },
  effects_UNSTABLE: [persistAtom],
});
