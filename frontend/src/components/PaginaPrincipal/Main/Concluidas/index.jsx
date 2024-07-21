import React, {useState} from "react";

function Concluidas({ tarefas, onConcluirTarefa }) {
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
        <section className="lista-concluidas">
            <h4>Tarefas Concluídas</h4>
            <div className="colunas">
                <ul className="coluna">
                    {coluna1.map(tarefa => (
                    <li className="tarefa" key={tarefa.id} onClick={() => onConcluirTarefa(tarefa.id)}>{tarefa.nome}</li>
                    ))}
                </ul>
                <ul className="coluna">
                    {coluna2.map(tarefa => (
                        <li className="tarefa" key={tarefa.id} onClick={() => onConcluirTarefa(tarefa.id)}>{tarefa.nome}</li>
                    ))}
                </ul>
            </div>
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

export default Concluidas;