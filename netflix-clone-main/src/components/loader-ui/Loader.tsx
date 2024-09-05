import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#111]">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700"></div>
    </div>
  );
};

export default Loader;
