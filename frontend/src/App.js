import './App.css';
import React from'react';

import { BrowserRouter as Router, Route, Routes } from'react-router-dom';

import PaginaPrincipal from './components/PaginaPrincipal';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
