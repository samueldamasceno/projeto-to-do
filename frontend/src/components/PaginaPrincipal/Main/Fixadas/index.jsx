import React, { useState } from "react";
import alfinete from '../../../../img/alfinete.png';
import lixeira from '../../../../img/lixo.png';
import styles from './Fixadas.module.css';

function Fixadas({ tarefas, onConcluirTarefa, onDesafixarTarefa, onDeleteTarefa }) {
    
    function deletarTarefa(id) {
        onDeleteTarefa(id);
    }

    const [paginaAtual, setPaginaAtual] = useState(1);
    const tarefasPorPagina = 10;
    const indexUltimaTarefa = paginaAtual * tarefasPorPagina;
    const indexPrimeiraTarefa = indexUltimaTarefa - tarefasPorPagina;
    const tarefasParaMostrar = tarefas.slice(indexPrimeiraTarefa, indexUltimaTarefa);
    const paginas = Math.ceil(tarefas.length / tarefasPorPagina);

    const proximaPagina = () => {
        if (paginaAtual < paginas) setPaginaAtual(paginaAtual + 1);
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
    };

    return (
        <section className={styles.fixadas}>
            <h4>Tarefas Fixadas</h4>
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
                        <button onClick={(e) => { e.stopPropagation(); onDesafixarTarefa(tarefa.id); }}>
                            <img 
                                src={alfinete} 
                                alt="Fixada" 
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

export default Fixadas;
