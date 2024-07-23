import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

import useCsrfToken from '../../hooks/useCsrfToken';
import styles from './Cadastro.module.css';

import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';

function Cadastro () {
    const csrfToken = useCsrfToken()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const nome = formData.get('nome');
        const sobrenome = formData.get('sobrenome');
        const email = formData.get('email');
        const nascimento = formData.get('nascimento');
        const senha = formData.get('senha');

        try {
            const response = await fetch('http://localhost:8000/api/usuarios/cadastro/', {
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
            navigate('/login');

            Store.addNotification({
                title: 'Sucesso!',
                message: 'Cadastro efetuado com sucesso!',
                type:'success',
                container: 'top-right',
                animationIn: ['animated', 'fadeIn'],
                animationOut: ['animated', 'fadeOut'],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });

        } catch (error) {
            console.error('Erro:', error);

            Store.addNotification({
                title: 'Erro!',
                message: 'Erro ao fazer cadastro: '+ error.message,
                type:'danger',
                container: 'top-right',
                animationIn: ['animated', 'fadeIn'],
                animationOut: ['animated', 'fadeOut'],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    };

    return (
        <div>
            <Header />
            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <label>
                            <input type="text" name="nome" placeholder="Nome" className={styles.formInput} required />
                        </label>
                        <label>
                            <input type="text" name="sobrenome" placeholder="Sobrenome" className={styles.formInput} required />
                        </label>
                    </div>
                    <div className={styles.formRow}>
                        <label>
                            <input type="email" name="email" placeholder="Email" className={styles.formInput} required />
                        </label>
                    </div>
                    <div className={styles.formRow}>
                        <label>
                            <input type="date" name="nascimento" className={styles.formInput} required />
                        </label>
                        <label>
                            <input type="password" name="senha" placeholder="Senha" className={styles.formInput} required />
                        </label>
                    </div>
                    <button type="submit" className={styles.submitButton}>Cadastrar</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Cadastro;
