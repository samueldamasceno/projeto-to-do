import React, {useState} from "react";
import alfinete from '../../../../img/alfinete.png';

function Fixadas({ tarefas, onConcluirTarefa, onDesafixarTarefa }) {

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

    const desafixarTarefa = (id) => {
        onDesafixarTarefa(id);
    }

    return (
        <section className="tarefas-fixadas">
            <h4>Tarefas Fixadas</h4>
            <ul>
                {tarefasParaMostrar.map(tarefa => (
                    <li className="tarefa" key={tarefa.id} onClick={() => onConcluirTarefa(tarefa.id)}>
                    <span>{tarefa.nome}</span>
                    <button>
                        <img src={alfinete} alt="Desafixar tarefa" onClick={(e) => {e.stopPropagation(); desafixarTarefa(tarefa.id)}} />
                    </button>
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

export default Fixadas;