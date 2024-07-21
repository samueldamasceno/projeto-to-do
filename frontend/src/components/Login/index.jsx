import './style.css'
import Header from '../Header';
import Footer from '../Footer';

import React, { useState, useEffect } from 'react';

function Login () {
    const [csrfToken, setCsrfToken] = useState('')

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/csrf-token/', {
                    method: 'GET',
                    credentials: 'include'
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao buscar o token CSRF');
                }
    
                const data = await response.json();
                setCsrfToken(data.csrfToken);
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const senha = formData.get('senha');

        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ email, senha })
            });

            if(!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const data = await response.json();
            console.log('Login efetuado com sucesso:', data);

            e.target.reset();

        } catch(error) {
            console.error('Erro:', error);
        }}

    return(
        <div>
            <Header />
            <main>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="email" name="email" placeholder='email' required />
                    </label>
                    <label>
                        <input type="password" name="senha" placeholder='senha' required />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default Login;