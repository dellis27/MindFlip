import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LuBrainCircuit } from "react-icons/lu";
import './App.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <nav className="navbar">
    <div className="nav-logo">MINDFLIP</div>
    <ul className="nav-links">
      <li><a href="#ABOUT US">ABOUT US</a></li>
      <li><a href="#CONTACT">CONTACT</a></li>
      <li><a href="#CONTACT">SERVICES</a></li>
    </ul>
    <style>
@import url('https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Audiowide&display=swap');
</style>
  </nav>
   <div className="center-box">
      <button className="SIGN-UP-BUTTON">SIGN UP</button>
      <button className="LOG-IN-BUTTON">LOG IN</button>
    </div>
    <div className="app">
     <LuBrainCircuit className="icon">icon</LuBrainCircuit>
    </div>
    </>
  )
}

export default App
