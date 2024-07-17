import React, {useEffect, useState} from 'react';

import './style.css';

import CriarTarefa from './CriarTarefa';
import ListaTarefas from './ListaTarefas';
import Fixadas from './Fixadas';

function Main() {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tarefas/');
                if (!response.ok) {
                    throw new Error('Erro ao buscar tarefas');
                }
                const data = await response.json();
                setTarefas(data);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchTarefas();
    }, []);

    const adicionarTarefa = async (nomeTarefa) => {
        const novaTarefa = { nome: nomeTarefa };

        try {
            const response = await fetch('http://localhost:8000/api/tarefas/', {
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
            setTarefas([...tarefas, tarefaCriada]);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <main>
            <CriarTarefa onAdicionarTarefa={adicionarTarefa} />
            <div className="tarefas-container">
                <ListaTarefas tarefas={tarefas}/>
                <Fixadas />
            </div>
        </main>
    );
}

export default Main;