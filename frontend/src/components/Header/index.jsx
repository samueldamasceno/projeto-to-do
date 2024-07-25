import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

import { logout } from '../../utils/auth';
import { useTema } from '../../hooks/useTema';

import useCsrfToken from '../../hooks/useCsrfToken';

function Header() {
    const {tema, mudarTema} = useTema();

    const csrfToken = useCsrfToken();

    function handleLogout() {
        logout(csrfToken);
    }

    return (
        <header className={styles.header}>
            <div>
                <button className={styles.btnTema} onClick={mudarTema}>
                    {tema ? 'modo claro' : 'modo escuro'}
                </button>
            </div>

            <Link to="/">
                <h4 className={styles.titulo}>lista de tarefas</h4>
            </Link>

            <div className={styles.btnContainer}>
                <Link to="/login">
                    <button className={styles.btnLogin}>login</button>
                </Link>
                <Link to="/cadastro">
                    <button className={styles.btnCad}>cadastro</button>
                </Link>
                <Link to='/login'>
                    <button onClick={handleLogout} className={styles.logout}>sair</button>
                </Link>
            </div>
        </header>
    );
}

export default Header;
