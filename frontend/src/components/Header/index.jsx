import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
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
            </div>
        </header>
    );
}

export default Header;
