import React, { useEffect, useState } from 'react';
import './App.css';
import { AtividadesList } from './components/AtividadesList/index';
import { AtividadeForm } from './components/AtividadeForm';
import api from './api/atividade';
import { Button, Modal } from 'react-bootstrap';

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
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShow = () => {
        setIsEdit(false);
        setFormValues({
            ...formValues,
            prioridade: '2',
            descricao: '',
            titulo: ''
        });
        setShow(true);
    };

    const getAll = async () => {
        try {
            const response = await api.get('atividade');
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    useEffect(() => {
        getAll().then((data) => {
            setAtividades(data);

        }).catch((error) => {
            console.error('Error setting state:', error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetAtividade = (id: number) => {
        const atividade = atividades.filter(atividade => atividade.id === id);
        setFormValues(atividade[0]);
        setIsEdit(true);
        setShow(true);
    };

    const deleteAtividade = async (id: number) => {
        try {
            const response = await api.delete('atividade/' + id);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    };

    const comfirmDelete = () => {
        deleteAtividade(formValues.id).then(() => {
            getAll().then((data) => {
                setAtividades(data);

            }).catch((error) => {
                console.error('Error setting state:', error);
            });

        }).catch((error) => {
            console.error('Error setting state:', error);
        });
        setShowDeleteModal(false);
    };


    const handleDeleteAtividade = (ativ: Atividade) => {
        setFormValues(ativ);
        setShowDeleteModal(true);

        //setAtividades(atividades.filter(atividade => atividade.id !== id));
    };

    return (
        <>
            <AtividadeForm
                atividades={atividades}
                setAtividades={setAtividades}
                formValues={formValues}
                setFormValues={setFormValues}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                show={show}
                setShow={setShow}
            />

            <Button variant="primary" className="mt-4" onClick={handleShow}>
                + Atividade
            </Button>

            <AtividadesList atividades={atividades} handleDeleteAtividade={handleDeleteAtividade} handleGetAtividade={handleGetAtividade} />

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Atividade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que quer excluir a Atividade {formValues.titulo}?
                </Modal.Body>
                <Modal.Footer>
                    <div className="row col-12">
                        <div className='col-md-6 d-flex justify-content-start'>
                            <Button variant="danger" onClick={() => comfirmDelete()}>
                                Excluir
                            </Button>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default App;
