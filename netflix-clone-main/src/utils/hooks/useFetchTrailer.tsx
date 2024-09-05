import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { movieAtom } from "../recoil-atoms/movieAtom";
import { trailersAtom } from "../recoil-atoms/trailersAtom";
import axios from "axios";
import { API_OPTIONS } from "../constants";

export default function useFetchTrailerLink(): void {
  const setTrailerLinkAndIdx = useSetRecoilState(trailersAtom);
  const { topRated } = useRecoilValue(movieAtom);

  useEffect(() => {
    const fetchTrailerLink = async () => {
      if (!topRated || topRated.length === 0) return;
      const randomIndex = Math.floor(Math.random() * topRated.length);
      const selectedMovie = topRated[randomIndex];

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos`,
        API_OPTIONS
      );

      const link = data?.results[0]?.key || "";

      setTrailerLinkAndIdx({ link: link, randomIndex: randomIndex });
    };

    fetchTrailerLink();
  }, [topRated, setTrailerLinkAndIdx]);
}
