import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from '../../api/atividade';
import { Button, Modal } from "react-bootstrap";

type Atividade = {
    id: number;
    prioridade?: string;
    descricao?: string;
    titulo?: string;
};

interface inputProps {
    atividades: Atividade[];
    setAtividades: (e: any) => void;
    formValues: Atividade;
    setFormValues: Dispatch<SetStateAction<Atividade>>;
    isEdit: boolean;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;

}

export function AtividadeForm({ atividades, setAtividades, formValues, setFormValues, isEdit, setIsEdit, show, setShow }: inputProps) {

    const [nextId, setNextId] = useState<number>(atividades.length + 1);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    useEffect(() => {
        //console.log(atividades);
        const id = (atividades.reduce((max, current) => (current.id > max.id ? current : max), atividades[0])?.id + 1);
        setNextId(isNaN(id) ? 1 : id);
    }, [atividades]);

    useEffect(() => {
        switch (formValues.prioridade) {
            case '1':
                setFormValues({ ...formValues, prioridade: '1' });
                break;
            case 'Baixa':
                setFormValues({ ...formValues, prioridade: '1' });
                break;
            case '2':
                setFormValues({ ...formValues, prioridade: '2' });
                break;
            case 'Normal':
                setFormValues({ ...formValues, prioridade: '2' });
                break;
            case '3':
                setFormValues({ ...formValues, prioridade: '3' });
                break;
            case 'Alta':
                setFormValues({ ...formValues, prioridade: '3' });
                break;
            default:
                setFormValues({ ...formValues, prioridade: '0' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues.id, setFormValues]);

    const postAtivivade = async (ativ: Atividade) => {
        try {
            const response = await api.post('atividade', ativ);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    };
    const putAtividade = async (ativ: Atividade) => {
        try {
            const response = await api.put('atividade/' + ativ.id, ativ);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    };
    const handleAddAtividade = () => {

        if (!isEdit) {
            //setAtividades([...atividades, { ...formValues, id: nextId }]);
            postAtivivade({ ...formValues, id: nextId }).then((data) => {
                setAtividades(data);
            }).catch((error) => {
                console.error('Error setting state:', error);
            });
        } else {
            //setAtividades(atividades.map(item => item.id === formValues.id ? formValues : item));
            putAtividade(formValues).then((data) => {
                setAtividades(atividades.map(item => item.id === data.id ? data : item));
            }).catch((error) => {
                console.error('Error setting state:', error);
            });
            setIsEdit(false);
        }

        setFormValues({
            id: nextId,
            prioridade: '2',
            descricao: '',
            titulo: ''
        });
        setShow(false);

    };

    //const handleCancelAtividade = () => {
    //    setIsEdit(false);
    //    setFormValues({
    //        id: nextId,
    //        prioridade: '2',
    //        descricao: '',
    //        titulo: ''
    //    });
    //};

    const handleClose = () => {
        setShow(false);
        //handleCancelAtividade();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Atividade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='row g-3'>
                    <div className="col-md-6">
                        <label htmlFor="inputPrioridade" className="form-label">Prioridade</label>
                        <select id="prioridade" className="form-select" onChange={handleInputChange} value={formValues.prioridade}>
                            <option value='1'>Baixa</option>
                            <option value='2'>Normal</option>
                            <option value='3'>Alta</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="titulo" className="form-label">Titulo</label>
                        <input type="text" className="form-control" id="titulo" onChange={handleInputChange} value={formValues.titulo} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <textarea className="form-control" id="descricao" onChange={handleInputChange} value={formValues.descricao} />
                    </div>


                </form>
            </Modal.Body>
            <Modal.Footer className="container">
                <div className="row col-12">
                    <div className='col-md-6 d-flex justify-content-start'>
                        {!isEdit ? (
                            <button type="button" className="btn btn-primary" onClick={handleAddAtividade}>+ Atividade</button>
                        ) : (<>
                            <button type="button" className="btn btn-primary me-2" onClick={handleAddAtividade}>Salvar</button>
                        </>)
                        }

                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>

    );
}