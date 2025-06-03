import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Category,
  FlashCards,
  HomePage,
  List,
  NotFound,
  Quiz,
  Login,
  Contact
} from './pages/Index';
import Layout from './components/Layout';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public login route */}
        <Route path="/login" element={<Login />} />

        {/* Main Layout for nested pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="categories" element={<Category />} />
          <Route path="categories/:categoryName" element={<Category />} />
          <Route path="flashcards" element={<FlashCards />} />
          <Route path="quiz" element={<Quiz />} />
          
          <Route path="quiz/:subject/:category" element={<Quiz />} />
          <Route path="list" element={<List />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;