import React, {useEffect, useState} from 'react';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';

import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PaginaPrincipal from './components/PaginaPrincipal';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

import useCsrfToken from './hooks/useCsrfToken';
import { usuarioLogado } from './utils/auth';
import { TemaProvider } from './hooks/useTema';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const csrfToken = useCsrfToken();

  useEffect(() => {
    const verificarLogin = async () => {
      if (csrfToken) {
        const logado = await usuarioLogado(csrfToken);
        setIsAuthenticated(logado);
      }
    }; verificarLogin();
  }, [csrfToken])

  return (
    <TemaProvider>
      <Router>
        <div className="App">
          <ReactNotifications />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/" element={isAuthenticated ? <PaginaPrincipal /> : <Navigate to="/login" />}></Route>
          </Routes>
        </div>
      </Router>
    </TemaProvider>
  );
}

export default App;
