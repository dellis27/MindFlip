import '../css/Header.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FiLogIn } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";

function Header() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="headerbody">
      <div className="header-content">
        <div className="header-logo-title">
          <img
            className="header-logo"
            src="/brain.svg"
            alt="MindFlip Logo"
          />
          <div className="header-titles">
            <h1>MindFlip</h1>
            <h3>An all-in-one study guide</h3>
          </div>
        </div>

        <nav className="header-nav">
          <ul>
            <li><Link to="/about">ABOUT US</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </nav>

        <div className="button-box">
          <button type="button" className="login-button">
            <span className="login-icon">
              <FiLogIn aria-hidden="true" />
            </span>
            <span>Login</span>
          </button>

          <button type="button" className="signup-button">
            <span className="signup-icon">
              <TfiWrite aria-hidden="true" />
            </span>
            <span>Sign Up</span>
          </button>

          <button
            type="button"
            className="theme-toggle-button"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;