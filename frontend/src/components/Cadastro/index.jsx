import './style.css';
import Header from '../Header';
import Footer from '../Footer';

import React from 'react';
import useCsrfToken from '../../hooks/useCsrfToken';

function Cadastro () {
    const csrfToken = useCsrfToken()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const nome = formData.get('nome');
        const sobrenome = formData.get('sobrenome');
        const email = formData.get('email');
        const nascimento = formData.get('nascimento');
        const senha = formData.get('senha');

        try {
            const response = await fetch('http://localhost:8000/api/cadastro/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, sobrenome, email, nascimento, senha })
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer cadastro');
            }

            const data = await response.json();
            console.log('Cadastro efetuado com sucesso:', data);

            e.target.reset();

        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>
                            <input type="text" name="nome" placeholder="Nome" required />
                        </label>
                        <label>
                            <input type="text" name="sobrenome" placeholder="Sobrenome" required />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            <input type="email" name="email" placeholder="Email" required />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            <input type="date" name="nascimento" required />
                        </label>
                        <label>
                            <input type="password" name="senha" placeholder="Senha" required />
                        </label>
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Cadastro;
