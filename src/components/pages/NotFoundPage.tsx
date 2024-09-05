import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <div className="h-screen bg-black text-white flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Page Not Found</p>
        <p className="text-base md:text-lg">
          Whoops, we couldn't find that page. Try going back to your previous
          page.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
