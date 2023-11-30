type Atividade = {
    id: number;
    prioridade?: string;
    descricao?: string;
    titulo?: string;
};

interface inputProps {
    key: number;
    ativ: Atividade;
    handleDeleteAtividade: (ativ: Atividade) => void;
    handleGetAtividade: (id: number) => void;
}

export function AtividadeCard({ ativ, handleDeleteAtividade, handleGetAtividade }: inputProps) {
    function prioridadeLabel(param: string | undefined) {
        switch (param) {
            case '1':
                return 'Baixa';
            case 'Baixa':
                return 'Baixa';
            case '2':
                return 'Normal';
            case 'Normal':
                return 'Normal';
            case '3':
                return 'Alta';
            case 'Alta':
                return 'Alta';
            default:
                return 'Undefined';
        }
    }
    return (
        <div key={ativ.id} className="card mb-2 shadow">
            <div className="card-body">

                <div className='d-flex justify-content-between'>
                    <h5 className='card-title'>
                        {ativ.id} - {ativ.titulo}
                    </h5>
                    <h6>
                        Prioridade: {prioridadeLabel(ativ.prioridade)}
                    </h6>
                </div>
                <p className="card-text">{ativ.descricao}</p>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-primary btn-sm me-1' onClick={() => handleGetAtividade(ativ.id)}>Editar</button>
                    <button className='btn btn-outline-danger btn-sm' onClick={() => handleDeleteAtividade(ativ)}>Deletar</button>
                </div>
            </div>
        </div>
    );
}