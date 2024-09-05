import React from "react";
import { useRecoilValue } from "recoil";
import { IoPlaySharp } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { movieAtom } from "../../../utils/recoil-atoms/movieAtom";
import { trailersAtom } from "../../../utils/recoil-atoms/trailersAtom";
import useFetchTrailerLink from "../../../utils/hooks/useFetchTrailer";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { IMG_CDN_URL } from "../../../utils/constants";

const Hero: React.FC = () => {
  useFetchTrailerLink();
  const { topRated } = useRecoilValue(movieAtom);
  const { link, randomIndex } = useRecoilValue(trailersAtom);
  const width = useWindowSize();

  if (!topRated || topRated.length === 0 || randomIndex === -1) return null;

  const { title, name, overview, poster_path } = topRated[randomIndex];
  const isMdAndAbove = width >= 768;
  const isDesktop = width >= 1024;

  return (
    <>
      <section
        className="relative h-[50%] md:h-[90vh] flex flex-col items-start justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 100%)`,
        }}
      >
        {!isMdAndAbove && (
          <div className="bg-cover bg-center bg-no-repeat">
            <img src={`${IMG_CDN_URL}${poster_path}`} alt="" />
          </div>
        )}
        {isMdAndAbove && (
          <div className="relative w-full min-h-screen overflow-hidden aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${link}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&mute=1&loop=1&playlist=${link}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full min-h-screen scale-x-[1.35] scale-y-[1.35]"
            ></iframe>
          </div>
        )}

        {isMdAndAbove && (
          <div className="absolute bottom-20 md:bottom-40 left-10 md:left-20 p-2 md:p-5 text-gray-100">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold w-1/2">
              {title || name}
            </h1>
            {isDesktop && <p className="mt-2 w-1/2">{overview}</p>}
          </div>
        )}

        <div className="absolute bottom-16 left-10 md:bottom-24 md:left-24 flex gap-2 md:gap-4">
          <button className="bg-slate-100 hover:bg-slate-200 hover:opacity-95 text-black font-bold px-5 py-2 md:px-10 md:py-4 rounded flex items-center justify-center transition duration-200 ease-in-out">
            <IoPlaySharp className="text-lg md:text-3xl" />
            <span className="text-2xl font-semibold ml-3">Play</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 opacity-80 text-gray-100 font-bold px-5 py-2 md:px-10 md:py-4 rounded flex items-center justify-center transition duration-200 ease-in-out">
            <AiOutlineInfoCircle className="text-lg md:text-3xl" />
            <span className="text-lg font-semibold ml-3">Read More</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
