import React from "react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

interface RowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<RowProps> = ({ title, movies }) => {
  return (
    <div className="z-auto">
      <h2 className="text-4xl font-semibold mb-4 text-gray-100">{title}</h2>
      <div className="flex overflow-x-scroll no-scrollbar cursor-pointer">
        {movies?.map((movie) => (
          <div key={movie.id} className="relative mr-4 min-w-[110px] ">
            <img
              className="w-44 h-66 object-cover rounded-lg transition-transform duration-200 hover:scale-110 hover:shadow-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
            <div className="absolute rounded-lg inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 hover:bg-opacity-50 hover:opacity-100 transition-opacity duration-200">
              <p className="text-gray-100 text-center">
                {movie.title || movie.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
