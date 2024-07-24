import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

import useCsrfToken from '../../hooks/useCsrfToken';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import { Store } from 'react-notifications-component';

function Login () {
    const csrfToken = useCsrfToken();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const senha = formData.get('senha');
    
        try {
            const response = await fetch('http://localhost:8000/api/usuarios/login/', {
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
    
            e.target.reset();
            navigate('/');

            Store.addNotification({
                title: 'Login feito com sucesso!',
                message: 'Bem-vindo!',
                type:'success',
                container: 'top-right',
                animationIn: ['animated', 'fadeIn'],
                animationOut: ['animated', 'fadeOut'],
                dismiss: {
                    duration: 5000,
                    onScreen: 5000,
                }
            });

        } catch (error) {
            console.error('Erro:', error);

            Store.addNotification({
                title: 'Erro',
                message: error.message,
                type: 'danger',
                container: 'top-right',
                animationIn: ['animated', 'fadeIn'],
                animationOut: ['animated', 'fadeOut'],
                dismiss: {
                    duration: 5000,
                    onScreen: 5000,
                }
            });
        }
    };

    return (
        <div>
            <Header />
            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.formLabel}>
                        <input type="email" name="email" placeholder="Email" className={styles.formInput} required />
                    </label>
                    <label className={styles.formLabel}>
                        <input type="password" name="senha" placeholder="Senha" className={styles.formInput} required />
                    </label>
                    <button type="submit" className={styles.submitButton}>Login</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
