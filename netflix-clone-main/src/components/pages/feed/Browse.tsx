import React from "react";
import { useRecoilValue } from "recoil";

import Hero from "./Hero";
import Movies from "./Movies";
import Loader from "../../loader-ui/Loader";
import { movieAtom } from "../../../utils/recoil-atoms/movieAtom";
import useFetchMovies from "../../../utils/hooks/useFetchMovies";
import toast from "react-hot-toast";

const Browse: React.FC = () => {
  const { trending } = useRecoilValue(movieAtom);
  useFetchMovies();

  if (!trending || trending.length <= 0) return <Loader />;

  return (
    <div className="relative z-0 bg-black w-full min-h-screen overflow-hidden">
      <Hero />
      <Movies />
    </div>
  );
};

export default Browse;

toast("Please refersh page if movies do not load");
