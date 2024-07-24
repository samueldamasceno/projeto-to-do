import React, { useState, useEffect } from "react";
import alfinete from '../../../../img/alfinete.png';
import alfineteBranco from '../../../../img/alfinete-branco.png';
import lixeira from '../../../../img/lixo.png';
import styles from './ListaTarefas.module.css';

function ListaTarefas({ tarefas, onFixarTarefa, onDesafixarTarefa, onConcluirTarefa, onDeleteTarefa }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [tarefasLocal, setTarefasLocal] = useState(tarefas);

    useEffect(() => {
        setTarefasLocal(tarefas);
    }, [tarefas]);

    function deletarTarefa(id) {
        setTarefasLocal(tarefasLocal.filter(tarefa => tarefa.id!== id));
        onDeleteTarefa(id);
    }

    const tarefasPorPagina = 10;
    const indexUltimaTarefa = paginaAtual * tarefasPorPagina;
    const indexPrimeiraTarefa = indexUltimaTarefa - tarefasPorPagina;
    const tarefasParaMostrar = tarefasLocal.slice(indexPrimeiraTarefa, indexUltimaTarefa);
    const paginas = Math.ceil(tarefas.length / tarefasPorPagina);

    const proximaPagina = () => {
        if (paginaAtual < paginas) setPaginaAtual(paginaAtual + 1);
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
    };

    const handleFixarTarefa = (idTarefa) => {
        const tarefa = tarefasLocal.find(tarefa => tarefa.id === idTarefa);

        if (tarefa.fixada) {
            onDesafixarTarefa(idTarefa);
        } else {
            onFixarTarefa(idTarefa);
        }
    };

    return (
        <section className={styles.listaTarefas}>
            <h4>Lista de Tarefas</h4>
            <ul>
                {tarefasParaMostrar.map(tarefa => (
                    <li
                        className={styles.tarefa}
                        key={tarefa.id}
                        onClick={() => onConcluirTarefa(tarefa.id)}
                    >
                        <span>{tarefa.nome}</span>
                        <button onClick={(e) => {e.stopPropagation(); deletarTarefa(tarefa.id)}}>
                            <img 
                                src={lixeira} 
                                alt="Deletar" 
                            />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleFixarTarefa(tarefa.id); }}>
                            <img 
                                src={tarefa.fixada ? alfinete : alfineteBranco} 
                                alt="Fixar/Desafixar" 
                            />
                        </button>
                    </li>
                ))}
            </ul>
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

export default ListaTarefas;
