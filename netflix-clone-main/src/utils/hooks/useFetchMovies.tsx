import axios from "axios";
import { useEffect } from "react";
import { useRecoilSnapshot, useSetRecoilState } from "recoil";
import { movieAtom } from "../recoil-atoms/movieAtom";
import { requests } from "../constants";

export default function useFetchMovies() {
  const setMoviesState = useSetRecoilState(movieAtom);
  const snapshot = useRecoilSnapshot();

  useEffect(() => {
    // Detect page refresh
    const navigationEntries = window.performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const isPageRefresh = navigationEntries.some(
      (entry) => entry.type === "reload"
    );
    if (isPageRefresh) {
      sessionStorage.removeItem("recoil-movie-persist");
    }

    if (!isPageRefresh) return;

    const fetchMovies = async () => {
      try {
        const currentState = snapshot.getLoadable(movieAtom).contents;
        if (currentState.trending.length > 0) {
          return;
        }

        const baseUrl = "https://api.themoviedb.org/3/";
        const responses = await Promise.all([
          axios.get(`${baseUrl}${requests.fetchTrending}`),
          axios.get(`${baseUrl}${requests.fetchNetflixOriginals}`),
          axios.get(`${baseUrl}${requests.fetchTopRated}`),
          axios.get(`${baseUrl}${requests.fetchActionMovies}`),
          axios.get(`${baseUrl}${requests.fetchComedyMovies}`),
          axios.get(`${baseUrl}${requests.fetchHorrorMovies}`),
          axios.get(`${baseUrl}${requests.fetchRomanceMovies}`),
          axios.get(`${baseUrl}${requests.fetchDocumentaries}`),
          axios.get(`${baseUrl}${requests.fetchTrendingTV}`),
          axios.get(`${baseUrl}${requests.fetchPopularTV}`),
          axios.get(`${baseUrl}${requests.fetchTopRatedTV}`),
        ]);

        setMoviesState({
          trending: responses[0].data.results,
          netflixOriginals: responses[1].data.results,
          topRated: responses[2].data.results,
          actionMovies: responses[3].data.results,
          comedyMovies: responses[4].data.results,
          horrorMovies: responses[5].data.results,
          romanceMovies: responses[6].data.results,
          documentaries: responses[7].data.results,
          trendingTV: responses[8].data.results,
          popularTV: responses[9].data.results,
          topRatedTV: responses[10].data.results,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, []);
}
