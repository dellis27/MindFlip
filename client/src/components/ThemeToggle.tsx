import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} style={{
      backgroundColor: 'var(--accent-color)',
      color: 'var(--text-color)',
      border: 'none',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      marginLeft: '1rem'
    }}>
      {theme === 'light' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
    </button>
  );
};

export default ThemeToggle;