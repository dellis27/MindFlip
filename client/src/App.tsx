import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Category, FlashCards, HomePage, Landing, List, NotFound, Quiz } from './pages/Index'

function App() {

  return (
    <>
      <BrowserRouter> {/* Probably spending more time than needed on making sure the structure is set up correctly. Had a lot of issues with file structure in our last project*/}
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/home" element={<HomePage/>} /> {/* Will bring to a page where the user is prompted to choose a subject to go to, and then will go and prompt the user to choose flashcards or quiz or the list, will need to make a option for /"categoryName"/"Quiz/List/Flashcards"*/}
          <Route path="/categories" element={<HomePage/>}/> {/*Handling cases of the users going to this address. I should edit this to route them to /home */}
          <Route path="/flashcards" element={<FlashCards/>} />
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/categories/:categoryName" element={<Category/>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>

      
    </>
  );
}

export default App
