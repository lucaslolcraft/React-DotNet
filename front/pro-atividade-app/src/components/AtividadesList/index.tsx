import { AtividadeCard } from "../AtividadeCard";

type Atividade = {
    id: number;
    prioridade?: string;
    descricao?: string;
    titulo?: string;
};

interface inputProps {
    atividades: Atividade[];
    handleDeleteAtividade: (id: number) => void;
    handleGetAtividade: (id: number) => void;
}

export function AtividadesList({ handleDeleteAtividade, atividades = [], handleGetAtividade }: inputProps) {
    return (
        <div className="mt-3">
            <ul className="list-group">
                {atividades.map(ativ => (
                    <AtividadeCard ativ={ativ} handleDeleteAtividade={handleDeleteAtividade} handleGetAtividade={handleGetAtividade} key={ativ.id} />
                ))}
            </ul>
        </div >
    );
}