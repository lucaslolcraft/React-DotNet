import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from '../../api/atividade';

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

}

export function AtividadeForm({ atividades, setAtividades, formValues, setFormValues, isEdit, setIsEdit }: inputProps) {

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

    const postAtivivade = async (ativ: Atividade) => {
        try {
            const response = await api.post('atividade', ativ);
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
            setAtividades(atividades.map(item => item.id === formValues.id ? formValues : item));
            setIsEdit(false);
        }

        setFormValues({
            id: nextId,
            prioridade: '2',
            descricao: '',
            titulo: ''
        });

    };

    const handleCancelAtividade = () => {
        setIsEdit(false);
        setFormValues({
            id: nextId,
            prioridade: '2',
            descricao: '',
            titulo: ''
        });
    };

    return (
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

            <div className='col-12'>
                {!isEdit ? (
                    <button type="button" className="btn btn-primary" onClick={handleAddAtividade}>+ Atividade</button>
                ) : (<>
                    <button type="button" className="btn btn-primary me-2" onClick={handleAddAtividade}>Salvar</button>
                    <button type="button" className="btn btn-primary" onClick={handleCancelAtividade}>Cancelar</button>
                </>)
                }

            </div>
        </form>
    );
}