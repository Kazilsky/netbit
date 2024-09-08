import React, { useContext } from 'react';
import { ThemeContext } from '../main';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const ThemeSwap = (context) => {
    toggleTheme(context)
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={ThemeSwap}
      className={`
        p-2 rounded-full transition-all duration-300 ease-in-out
        ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-yellow-100 text-gray-800'}
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400
      `}
    >
      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;
