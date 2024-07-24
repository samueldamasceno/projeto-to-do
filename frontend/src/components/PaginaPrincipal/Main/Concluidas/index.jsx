import React, { useState } from "react";
import styles from './Concluidas.module.css';
import lixeira from '../../../../img/lixo.png';

function Concluidas({ tarefas, onConcluirTarefa, onDeleteTarefa }) {
    function deletarTarefa(id) {
        onDeleteTarefa(id);
    }

    const [paginaAtual, setPaginaAtual] = useState(1);
    const tarefasPorPagina = 20;

    const indexUltimaTarefa = paginaAtual * tarefasPorPagina;
    const indexPrimeiraTarefa = indexUltimaTarefa - tarefasPorPagina;
    const tarefasParaMostrar = tarefas.slice(indexPrimeiraTarefa, indexUltimaTarefa);
    
    const coluna1 = tarefasParaMostrar.slice(0, 10);
    const coluna2 = tarefasParaMostrar.slice(10, 20);
    
    const paginas = Math.ceil(tarefas.length / tarefasPorPagina);

    const proximaPagina = () => {
        if (paginaAtual < paginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    }

    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    }

    return (
        <section className={styles.listaConcluidas}>
            <h4>Tarefas Concluídas</h4>
            <div className={styles.colunas}>
                <ul className={styles.coluna}>
                    {coluna1.map(tarefa => (
                        <li className={styles.tarefa} key={tarefa.id} onClick={() => onConcluirTarefa(tarefa.id)}>
                            <span>{tarefa.nome}</span>
                            <button className={styles.btnDel} onClick={(e) => {e.stopPropagation(); deletarTarefa(tarefa.id)}}>
                            <img 
                                src={lixeira} 
                                alt="Deletar" 
                            />
                            </button>
                            </li>
                    ))}
                </ul>
                <ul className={styles.coluna}>
                    {coluna2.map(tarefa => (
                        <li className={styles.tarefa} key={tarefa.id} onClick={() => onConcluirTarefa(tarefa.id)}>
                            <span>{tarefa.nome}</span>
                            <button className={styles.btnDel} onClick={(e) => {e.stopPropagation(); deletarTarefa(tarefa.id)}}>
                            <img 
                                src={lixeira} 
                                alt="Deletar" 
                            />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {paginas > 1 && (
                <div className={styles.paginacao}>
                    <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
                        Anterior
                    </button>
                    <span>{paginaAtual} de {paginas}</span>
                    <button onClick={proximaPagina} disabled={paginaAtual === paginas}>
                        Próxima
                    </button>
                </div>
            )}
        </section>
    );
}

export default Concluidas;
