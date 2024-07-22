import './App.css';
import React from'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from'react-router-dom';

import PaginaPrincipal from './components/PaginaPrincipal';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import { usuarioLogado } from './utils/auth';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={usuarioLogado() ? <PaginaPrincipal /> : <Navigate to="/login" />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
