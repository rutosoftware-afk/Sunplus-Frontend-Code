import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal overflow-hidden">
      {/* Animated shimmer tile grid pattern */}
      <div className="absolute inset-0 floating-grid opacity-10 animate-shimmer" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mb-6 shadow-lg"></div>
        <h2 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-gold animate-pulse">
          SUNPLUS CERA
        </h2>
        <p className="text-gold/80 mt-2 text-sm tracking-wide">Defining Elegance...</p>
      </div>
    </div>
  );
};

export default Loader;
