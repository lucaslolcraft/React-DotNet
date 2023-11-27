import React, { useState } from 'react';
import './App.css';
import { AtividadesList } from './components/AtividadesList/index';
import { AtividadeForm } from './components/AtividadeForm';

type Atividade = {
    id: number;
    prioridade?: string;
    descricao?: string;
    titulo?: string;
};

function App() {


    const [atividades, setAtividades] = useState<Atividade[]>([
        {
            id: 1,
            prioridade: '1',
            descricao: 'Primeira atividade',
            titulo: 'Primeira'
        },
        {
            id: 2,
            prioridade: '1',
            descricao: 'Segunda atividade',
            titulo: 'Segunda'
        },
    ]);

    const [formValues, setFormValues] = useState<Atividade>({
        id: 0,
        prioridade: '2',
        descricao: '',
        titulo: ''
    });

    const [isEdit, setIsEdit] = useState(false);


    const handleGetAtividade = (id: number) => {
        const atividade = atividades.filter(atividade => atividade.id === id);
        setFormValues(atividade[0]);
        setIsEdit(true);
    };


    const handleDeleteAtividade = (id: number) => {
        setAtividades(atividades.filter(atividade => atividade.id !== id));
    };

    return (
        <>
            <AtividadeForm atividades={atividades} setAtividades={setAtividades} formValues={formValues} setFormValues={setFormValues} isEdit={isEdit} setIsEdit={setIsEdit} />

            <AtividadesList atividades={atividades} handleDeleteAtividade={handleDeleteAtividade} handleGetAtividade={handleGetAtividade} />
        </>
    );
}

export default App;
