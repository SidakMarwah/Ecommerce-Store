import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-76px)] flex justify-center items-center">
      <img src="/assets/Loader.svg" alt="Loading..." />
    </div>
  );
};

export default Loader;
