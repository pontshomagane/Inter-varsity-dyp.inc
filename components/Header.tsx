
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-wider">
        DYP<span className="text-slate-200">.inc</span>
      </h1>
      <p className="text-slate-400 mt-1">Your Digital Perimeter, Fortified.</p>
    </header>
  );
};

export default Header;
