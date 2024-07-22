import './style.css';
import Header from '../Header';
import Footer from '../Footer';

import React from 'react';

import { logarUsuario } from '../../utils/auth';
import useCsrfToken from '../../hooks/useCsrfToken';
import { useNavigate } from 'react-router-dom';

function Login () {
    const csrfToken = useCsrfToken();
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();

    
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const senha = formData.get('senha');
    
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });
    
            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }
    
            const data = await response.json();
            console.log('Login efetuado com sucesso:', data);
    
            logarUsuario(true);
    
            e.target.reset();

            navigate('/');

    
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="email" name="email" placeholder="Email" required />
                    </label>
                    <label>
                        <input type="password" name="senha" placeholder="Senha" required />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
