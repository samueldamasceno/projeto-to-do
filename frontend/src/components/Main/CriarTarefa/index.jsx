import React, {useState} from 'react';
import './style.css';

function CriarTarefa({onAdicionarTarefa}) {
    const [nomeTarefa, setNomeTarefa] = useState('');

    const enviarForm = (e) => {
        e.preventDefault();

        if (nomeTarefa.trim() === '') {
            alert('Você não pode adicionar uma tarefa vazia.');
            return;
        }

        onAdicionarTarefa(nomeTarefa);
        setNomeTarefa('');


    }

    return (
        <section className="criar-tarefa">
            <h4>Criar Tarefa</h4>
            <form className='form-criar' onSubmit={enviarForm}>
                <input
                    type="text"
                    placeholder="Nome da tarefa"
                    className="input-tarefa"
                    value={nomeTarefa}
                    onChange={(e) => setNomeTarefa(e.target.value)}
                />
                <button type="submit" className="btn-criar">Adicionar Tarefa</button>
            </form>
        </section>
    );
}

export default CriarTarefa;