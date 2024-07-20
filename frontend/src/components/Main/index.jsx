import React, {useEffect, useState} from 'react';

import './style.css';

import CriarTarefa from './CriarTarefa';
import ListaTarefas from './ListaTarefas';
import Fixadas from './Fixadas';
import Concluidas from './Concluidas';

function Main() {
    const [tarefasPendentes, setTarefasPendentes] = useState([]);
    const [tarefasConcluidas, setTarefasConcluidas] = useState([]);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const responsePendentes = await fetch('http://localhost:8000/api/tarefas-pendentes/');
                if (!responsePendentes.ok) {
                    throw new Error('Erro ao buscar tarefas pendentes');
                }
                const dataPendentes = await responsePendentes.json();
                setTarefasPendentes(dataPendentes);

                const responseConcluidas = await fetch('http://localhost:8000/api/tarefas-concluidas/');
                if (!responseConcluidas.ok) {
                    throw new Error('Erro ao buscar tarefas concluídas');
                }
                const dataConcluidas = await responseConcluidas.json();
                setTarefasConcluidas(dataConcluidas);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchTarefas();
    }, []);

    const adicionarTarefa = async (nomeTarefa) => {
        const novaTarefa = { nome: nomeTarefa };

        try {
            const response = await fetch('http://localhost:8000/api/tarefas-pendentes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaTarefa),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar tarefa');
            }

            const tarefaCriada = await response.json();
            setTarefasPendentes([...tarefasPendentes, tarefaCriada]);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const concluirTarefa = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:8000/api/concluir/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!resposta.ok) {
                throw new Error('Erro ao mudar status da tarefa');
            }
    
            const tarefaAtualizada = tarefasPendentes.find(tarefa => tarefa.id === id) || tarefasConcluidas.find(tarefa => tarefa.id === id);
    
            if (!tarefaAtualizada) {
                throw new Error('Tarefa não encontrada');
            }
    
            if (tarefaAtualizada.status === 'P') {
                setTarefasPendentes(tarefasPendentes.filter(tarefa => tarefa.id !== id));
                setTarefasConcluidas([...tarefasConcluidas, tarefaAtualizada]);
            } else {
                setTarefasConcluidas(tarefasConcluidas.filter(tarefa => tarefa.id !== id));
                setTarefasPendentes([...tarefasPendentes, tarefaAtualizada]);
            }
        } catch (error) {
            console.log("Erro: ", error);
        }
    };
    
    return (
        <main>
            <CriarTarefa onAdicionarTarefa={adicionarTarefa} />
            <div className="tarefas-container">
                <ListaTarefas tarefas={tarefasPendentes} onConcluirTarefa={concluirTarefa}/>
                <Fixadas />
            </div>
                <Concluidas tarefas={tarefasConcluidas} onConcluirTarefa={concluirTarefa}/>
        </main>
    );
}

export default Main;