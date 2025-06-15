
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { state, dispatch } = useResume();

  const toggleTheme = () => {
    const newTheme = state.resume.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      {state.resume.theme === 'light' ? (
        <>
          <Moon className="w-4 h-4" />
          <span className="text-sm">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          <span className="text-sm">Light</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
