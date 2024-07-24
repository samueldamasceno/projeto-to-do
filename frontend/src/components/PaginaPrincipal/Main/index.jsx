import React, { useEffect, useState } from 'react';
import { Store } from 'react-notifications-component'; 

import styles from './Main.module.css';

import CriarTarefa from './CriarTarefa';
import ListaTarefas from './ListaTarefas';
import Fixadas from './Fixadas';
import Concluidas from './Concluidas';

import useCsrfToken from '../../../hooks/useCsrfToken';
import { store } from 'react-notifications-component';

function Main() {
    const csrfToken = useCsrfToken();

    const [tarefasPendentes, setTarefasPendentes] = useState([]);
    const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
    const [tarefasFixadas, setTarefasFixadas] = useState([]);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const responsePendentes = await fetch('http://localhost:8000/api/tarefas/pendentes/', {
                    credentials: 'include'
                });
                if (!responsePendentes.ok) throw new Error('Erro ao buscar tarefas pendentes');
                const dataPendentes = await responsePendentes.json();
                setTarefasPendentes(dataPendentes);
    
                const responseConcluidas = await fetch('http://localhost:8000/api/tarefas/concluidas/', {
                    credentials: 'include'
                });
                if (!responseConcluidas.ok) throw new Error('Erro ao buscar tarefas concluídas');
                const dataConcluidas = await responseConcluidas.json();
                setTarefasConcluidas(dataConcluidas);
    
                const responseFixadas = await fetch('http://localhost:8000/api/tarefas/fixadas/', {
                    credentials: 'include'
                });
                if (!responseFixadas.ok) throw new Error('Erro ao buscar tarefas fixadas');
                const dataFixadas = await responseFixadas.json();
                setTarefasFixadas(dataFixadas);
                
            } catch (error) {
                console.error('Erro:', error);
    
                Store.addNotification({
                    title: 'Erro ao carregar tarefas',
                    message: error.message,
                    type: 'danger',
                    container: 'top-right',
                    dismiss: {
                        duration: 5000,
                        pauseOnHover: true,
                    },
                });
            }
        };
    
        fetchTarefas();
    }, []);
    

    const adicionarTarefa = async (nomeTarefa) => {
        const novaTarefa = { nome: nomeTarefa };

        try {
            const response = await fetch('http://localhost:8000/api/tarefas/pendentes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(novaTarefa),
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Erro ao adicionar tarefa');
            const tarefaCriada = await response.json();
            setTarefasPendentes([...tarefasPendentes, tarefaCriada]);
        } catch (error) {
            console.error('Erro:', error);

            Store.addNotification({
                title: 'Erro ao adicionar tarefa',
                message: error.message,
                type: 'danger',
                container: 'top-right',
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                },
            });
        }
    };

    const concluirTarefa = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:8000/api/tarefas/concluir/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            });

            if (!resposta.ok) throw new Error('Erro ao mudar status da tarefa');

            const tarefaAtualizada = tarefasPendentes.find(tarefa => tarefa.id === id) ||
                                     tarefasConcluidas.find(tarefa => tarefa.id === id);

            if (!tarefaAtualizada) throw new Error('Tarefa não encontrada');

            if (tarefasPendentes.find(tarefa => tarefa.id === id)) {
                setTarefasPendentes(tarefasPendentes.filter(tarefa => tarefa.id !== id));
                setTarefasConcluidas([...tarefasConcluidas, { ...tarefaAtualizada, status: 'C', fixada: false }]);
            } else {
                setTarefasConcluidas(tarefasConcluidas.filter(tarefa => tarefa.id !== id));
                setTarefasPendentes([...tarefasPendentes, { ...tarefaAtualizada, status: 'P' }]);
            }

            if (tarefasFixadas.find(tarefa => tarefa.id === id)) {
                setTarefasFixadas(tarefasFixadas.filter(tarefa => tarefa.id !== id));
            }
        } catch (error) {
            console.log("Erro: ", error);

            Store.addNotification({
                title: 'Erro ao concluir tarefa',
                message: error.message,
                type: 'danger',
                container: 'top-right',
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                },
            });
        }
    };

    const fixarTarefa = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:8000/api/tarefas/fixar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            });
    
            if (!resposta.ok) throw new Error('Erro ao fixar tarefa');
    
            const tarefaAtualizada = tarefasPendentes.find(tarefa => tarefa.id === id);
            if (!tarefaAtualizada) throw new Error('Tarefa não encontrada');
    
            setTarefasPendentes(tarefasPendentes.map(tarefa =>
                tarefa.id === id ? { ...tarefa, fixada: true } : tarefa
            ));
    
            setTarefasFixadas([...tarefasFixadas, { ...tarefaAtualizada, fixada: true }]);

        } catch (error) {
            console.log("Erro: ", error);

            Store.addNotification({
                title: 'Erro ao fixar tarefa',
                message: error.message,
                type: 'danger',
                container: 'top-right',
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                },
            });
        }
    };
    

    const desafixarTarefa = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:8000/api/tarefas/desafixar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            });
            
            if (!resposta.ok) throw new Error('Erro ao desafixar tarefa');
            
            const tarefaAtualizada = tarefasPendentes.find(tarefa => tarefa.id === id);
            if (!tarefaAtualizada) throw new Error('Tarefa não encontrada');

            setTarefasPendentes(tarefasPendentes.map(tarefa =>
                tarefa.id === id ? { ...tarefa, fixada: false } : tarefa
            ));

            setTarefasFixadas(tarefasFixadas.filter(tarefa => tarefa.id !== id));

        } catch (error) {
            console.log("Erro: ", error);

            Store.addNotification({
                title: 'Erro ao desafixar tarefa',
                message: error.message,
                type: 'danger',
                container: 'top-right',
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                },
            });
        }
    };

    const deletarTarefa = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:8000/api/tarefas/excluir/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            });
            
            if (!resposta.ok) throw new Error('Erro ao deletar tarefa');
            
            setTarefasPendentes(tarefasPendentes.filter(tarefa => tarefa.id!== id));
            setTarefasConcluidas(tarefasConcluidas.filter(tarefa => tarefa.id!== id));
            setTarefasFixadas(tarefasFixadas.filter(tarefa => tarefa.id!== id));

            Store.addNotification({
                title: 'Tarefa excluída com sucesso',
                message: 'Tarefa excluída com sucesso.',
                type:'success',
                container: 'top-right',
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                },
            })
            
        } catch (error) {
            console.log("Erro: ", error);
            
            Store.addNotification({
                title: 'Erro ao excluir tarefa',
                message: error.message,
                type: 'danger',
                container: 'top-right',
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                },
            });
        }
    }

    return (
        <main className={styles.main}>
            <CriarTarefa onAdicionarTarefa={adicionarTarefa} />
            <div className={styles.tarefasContainer}>
                <ListaTarefas 
                    tarefas={tarefasPendentes} 
                    onConcluirTarefa={concluirTarefa} 
                    onFixarTarefa={fixarTarefa} 
                    onDesafixarTarefa={desafixarTarefa}
                    onDeleteTarefa={deletarTarefa}
                />
                <Fixadas 
                    tarefas={tarefasFixadas} 
                    onConcluirTarefa={concluirTarefa} 
                    onDesafixarTarefa={desafixarTarefa}
                    onDeleteTarefa={deletarTarefa}
                />
            </div>
            <Concluidas 
                tarefas={tarefasConcluidas} 
                onConcluirTarefa={concluirTarefa}
                onDeleteTarefa={deletarTarefa}
            />
        </main>
    );
}

export default Main;
