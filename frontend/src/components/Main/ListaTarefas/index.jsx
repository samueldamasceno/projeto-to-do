import React, { useState } from "react";

function ListaTarefas({ tarefas }) {
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

    return (
        <section className="lista-tarefas">
            <h4>Lista de Tarefas</h4>
            <ul>
                {tarefasParaMostrar.map(tarefa => (
                    <li key={tarefa.id}>{tarefa.nome}</li>
                ))}
            </ul>
            <div className="paginacao">
                <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
                    Anterior
                </button>
                <span>{paginaAtual} de {paginas}</span>
                <button onClick={proximaPagina} disabled={paginaAtual === paginas}>
                    Próxima
                </button>
            </div>
        </section>
    );
}

export default ListaTarefas;