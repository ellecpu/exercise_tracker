import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import CreateExercise from './pages/CreateExercise';
import EditExercise from './pages/EditExercise';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Exercise Tracker</h1>
        <p>Track your workout exercises, by Elisha Roche</p>
      </header>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/edit/:id" element={<EditExercise />} />
        </Routes>
      </main>
      <footer>
        ©{new Date().getFullYear()}Elisha Roche
      </footer>
    </BrowserRouter>
  );
}

export default App;