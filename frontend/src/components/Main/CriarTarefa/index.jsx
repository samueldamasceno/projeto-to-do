import './style.css';

function CriarTarefa() {
    return (
        <section className="criar-tarefa">
            <h4>Criar Tarefa</h4>
            <form>
                <input type="text" placeholder="Nome da tarefa" className="input-tarefa" />
                <button type="submit" className="btn-criar">Adicionar Tarefa</button>
            </form>
        </section>
    );
}

export default CriarTarefa;