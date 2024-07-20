import React, { useState } from "react";
import alfinete from '../../../img/alfinete.png';
import alfineteBranco from '../../../img/alfinete-branco.png'

function ListaTarefas({ tarefas, onConcluirTarefa, onFixarTarefa, onDesafixarTarefa }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const tarefasPorPagina = 10;

    const indexUltimaTarefa = paginaAtual * tarefasPorPagina;
    const indexPrimeiraTarefa = indexUltimaTarefa - tarefasPorPagina;
    const tarefasParaMostrar = tarefas.slice(indexPrimeiraTarefa, indexUltimaTarefa);
    
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

    const fixarTarefa = (idTarefa) => {
        onFixarTarefa(idTarefa);
    }

    const desafixarTarefa = (idTarefa) => {
        onDesafixarTarefa(idTarefa)
    }

    return (
        <section className="lista-tarefas">
            <h4>Lista de Tarefas</h4>
            <ul>
                {tarefasParaMostrar.map(tarefa => (
                    <li className="tarefa" key={tarefa.id} onClick={() => onConcluirTarefa(tarefa.id)}>
                        <span>{tarefa.nome}</span>
                        {tarefa.fixada && (
                        <button>
                            <img src={alfinete} alt="Fixar tarefa" onClick={(e) => {e.stopPropagation(); desafixarTarefa(tarefa.id)}} />
                        </button>
                        )}
                        {!tarefa.fixada && (
                        <button>
                            <img src={alfineteBranco} alt="Desafixar tarefa" onClick={(e) => {e.stopPropagation(); fixarTarefa(tarefa.id)}} />
                        </button>
                        )}
                    </li>
                ))}
            </ul>
            {paginas > 1 && (
                <div className="paginacao">
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