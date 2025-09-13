import React from 'react';
import ThemeToggle from './ThemeToggle';

type Theme = 'light' | 'dark' | 'system';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="mb-8 flex justify-between items-start">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-600 dark:text-cyan-400 tracking-wider">
          DYP<span className="text-slate-800 dark:text-slate-200">.inc</span>
          <span className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-light ml-2">- Defend Your Privacy</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Level Up Your Privacy Game.</p>
      </div>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
};

export default Header;