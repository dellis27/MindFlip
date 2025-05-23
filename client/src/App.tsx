import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LuBrainCircuit } from "react-icons/lu";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Category, FlashCards, HomePage, List, NotFound, Quiz, Login } from './pages/Index'
import Layout from './components/Layout';

function App() {

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
      <BrowserRouter> {/* Probably spending more time than needed on making sure the structure is set up correctly. Had a lot of issues with file structure in our last project*/}
        <Routes>
            <Route path="/login" element={<Login/>} />
        
          
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage/>} /> {/* Will bring to a page where the user is prompted to choose a subject to go to, and then will go and prompt the user to choose flashcards or quiz or the list, will need to make a option for /"categoryName"/"Quiz/List/Flashcards"*/}
            <Route path="/categories" element={<Category/>}/> {/*Handling cases of the users going to this address. I should edit this to route them to /home */}
            <Route path="/flashcards" element={<FlashCards/>} />
            <Route path="/quiz" element={<Quiz/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="/categories/:categoryName" element={<Category/>}/>
            <Route path="/*" element={<NotFound/>}/>
          </Route>

        </Routes>
      </BrowserRouter>

      
    </>
  );
}

export default App
