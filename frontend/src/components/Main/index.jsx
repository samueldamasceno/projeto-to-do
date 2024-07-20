import React, {useEffect, useState} from 'react';

import './style.css';

import CriarTarefa from './CriarTarefa';
import ListaTarefas from './ListaTarefas';
import Fixadas from './Fixadas';
import Concluidas from './Concluidas';

function Main() {
    const [csrfToken, setCsrfToken] = useState('')

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/csrf-token/', {
                    method: 'GET',
                    credentials: 'include'
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao buscar o token CSRF');
                }
    
                const data = await response.json();
                setCsrfToken(data.csrfToken);
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchCsrfToken();
    }, []);

    const [tarefasPendentes, setTarefasPendentes] = useState([]);
    const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
    const [tarefasFixadas, setTarefasFixadas] = useState([]);

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

                const responseFixadas = await fetch('http://localhost:8000/api/tarefas-fixadas/');
                if (!responseFixadas.ok) {
                    throw new Error('Erro ao buscar tarefas fixadas');
                }
                const dataFixadas = await responseFixadas.json();
                setTarefasFixadas(dataFixadas);

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
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(novaTarefa),
                credentials: 'include',
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
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            });
    
            if (!resposta.ok) {
                throw new Error('Erro ao mudar status da tarefa');
            }
    
            const tarefaAtualizada = tarefasPendentes.find(tarefa => tarefa.id === id) || tarefasConcluidas.find(tarefa => tarefa.id === id);
    
            if (!tarefaAtualizada) {
                throw new Error('Tarefa não encontrada');
            }
    
            if (tarefasPendentes.includes(tarefaAtualizada)) {
                setTarefasPendentes(tarefasPendentes.filter(tarefa => tarefa.id !== id));
                setTarefasConcluidas([...tarefasConcluidas, { ...tarefaAtualizada, status: 'C' }]);
            } else {
                setTarefasConcluidas(tarefasConcluidas.filter(tarefa => tarefa.id !== id));
                setTarefasPendentes([...tarefasPendentes, { ...tarefaAtualizada, status: 'P' }]);
            }
    
        } catch (error) {
            console.log("Erro: ", error);
        }
    };
    
    const fixarTarefa = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:8000/api/fixar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            });

            if (!resposta.ok) {
                throw new Error('Erro ao fixar tarefa');
            }

            const tarefaAtualizada = tarefasPendentes.find(tarefa => tarefa.id === id)
            
            if (!tarefaAtualizada) {
                throw new Error('Tarefa não encontrada');
            } else {
                setTarefasFixadas([...tarefasFixadas, tarefaAtualizada]);
            }

        } catch (error) {
            console.log("Erro: ", error);
        }
    }

    const desafixarTarefa = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:8000/api/desafixar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            });
            
            if (!resposta.ok) {
                throw new Error('Erro ao desafixar tarefa');
            }

            const tarefaAtualizada = tarefasFixadas.find(tarefa => tarefa.id === id)
            
            if (!tarefaAtualizada) {
                throw new Error('Tarefa não encontrada');
            } else {
                setTarefasFixadas(tarefasFixadas.filter(tarefa => tarefa.id!== id));
            }

            
        } catch (error) {
            console.log("Erro: ", error);
        }
    }

    return (
        <main>
            <CriarTarefa onAdicionarTarefa={adicionarTarefa} />
            <div className="tarefas-container">
                <ListaTarefas tarefas={tarefasPendentes} onConcluirTarefa={concluirTarefa} onFixarTarefa={fixarTarefa}/>
                <Fixadas tarefas={tarefasFixadas} onConcluirTarefa={concluirTarefa} onDesafixarTarefa={desafixarTarefa}/>
            </div>
                <Concluidas tarefas={tarefasConcluidas} onConcluirTarefa={concluirTarefa}/>
        </main>
    );
}

export default Main;