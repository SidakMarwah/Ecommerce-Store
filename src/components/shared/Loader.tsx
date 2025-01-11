import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src="/assets/Loader.svg" alt="Loading..." />
    </div>
  );
};

export default Loader;
