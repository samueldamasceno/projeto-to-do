import React, { useState } from "react";
import styles from './CriarTarefa.module.css';

function CriarTarefa({ onAdicionarTarefa }) {
    const [nome, setNome] = useState("");

    const adicionarTarefa = () => {
        if (nome) {
            onAdicionarTarefa(nome);
            setNome("");
        }
    }

    return (
        <section className={styles.criarTarefa}>
            <h4>Criar Tarefa</h4>
            <div className={styles.formCriar}>
                <input
                    className={styles.inputTarefa}
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome da tarefa"
                />
                <button className={styles.btnCriar} onClick={adicionarTarefa}>
                    Adicionar
                </button>
            </div>
        </section>
    );
}

export default CriarTarefa;
