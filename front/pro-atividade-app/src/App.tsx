import React, { useEffect, useState } from 'react';
import './App.css';
import { AtividadesList } from './components/AtividadesList/index';
import { AtividadeForm } from './components/AtividadeForm';
import api from './api/atividade';

type Atividade = {
    id: number;
    prioridade?: string;
    descricao?: string;
    titulo?: string;
};

function App() {
    const [atividades, setAtividades] = useState<Atividade[]>([]);
    const [formValues, setFormValues] = useState<Atividade>({
        id: 0,
        prioridade: '2',
        descricao: '',
        titulo: ''
    });
    const [isEdit, setIsEdit] = useState(false);

    const getAll = async () => {
        try {
            const response = await api.get('atividade');
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const getAllCall = () => {
        getAll().then((data) => {
            setAtividades(data);

        }).catch((error) => {
            console.error('Error setting state:', error);
        });
    };

    useEffect(() => {
        getAllCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetAtividade = (id: number) => {
        const atividade = atividades.filter(atividade => atividade.id === id);
        setFormValues(atividade[0]);
        setIsEdit(true);
    };


    const handleDeleteAtividade = (id: number) => {
        setAtividades(atividades.filter(atividade => atividade.id !== id));
    };
    console.log(atividades);
    return (
        <>
            <AtividadeForm atividades={atividades} setAtividades={setAtividades} formValues={formValues} setFormValues={setFormValues} isEdit={isEdit} setIsEdit={setIsEdit} />

            <AtividadesList atividades={atividades} handleDeleteAtividade={handleDeleteAtividade} handleGetAtividade={handleGetAtividade} />
        </>
    );
}

export default App;
