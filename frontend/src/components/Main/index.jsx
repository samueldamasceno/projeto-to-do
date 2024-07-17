import './style.css';
import CriarTarefa from './CriarTarefa';
import ListaTarefas from './ListaTarefas';
import Fixadas from './Fixadas';

function Main() {
    return (
        <main>
            <CriarTarefa />
            <div className="tarefas-container">
                <ListaTarefas />
                <Fixadas />
            </div>
        </main>
    );
}

export default Main;