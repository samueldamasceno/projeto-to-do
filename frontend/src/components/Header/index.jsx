import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'react-notifications-component';

import styles from './Header.module.css';

import { logout } from '../../utils/auth';


function Header() {
    function handleLogout() {
        logout();

        Store.addNotification({
            title: 'Sessão encerrada',
            message: 'Você foi desconectado com sucesso.',
            type: 'success',
            container: 'top-right',
            dismiss: { duration: 3000 },
        });
    }

    return (
        <header className={styles.header}>
            <div></div>

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
