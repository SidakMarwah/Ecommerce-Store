import Image from 'next/image';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-76px)] flex justify-center items-center">
      <Image src="/assets/Loader.svg" width={200} height={200} alt="Loading..." />
    </div>
  );
};

export default Loader;
