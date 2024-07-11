import React, { useState, useEffect } from 'react';
import { api } from '../../server/api';

interface HorarioModalProps {
    profissional: {
        id: number;
        name: string;
    };
    onClose: () => void;
}

interface Horario {
    id: number;
    time: string;
}

export const HorarioModal: React.FC<HorarioModalProps> = ({ profissional, onClose }) => {
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [availableHorarios, setAvailableHorarios] = useState<Horario[]>([]);
    const [selectedHorario, setSelectedHorario] = useState<number | null>(null);

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await api.get(`https://localhost:7104/api/ProfissionalSchedule?profissionalId=${profissional.id}`);
                setHorarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar horários:', error);
            }
        };

        const fetchAvailableHorarios = async () => {
            try {
                const response = await api.get('https://localhost:7104/api/Schedule');
                setAvailableHorarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar horários disponíveis:', error);
            }
        };

        fetchHorarios();
        fetchAvailableHorarios();
    }, [profissional.id]);

    const handleAddHorario = async () => {
        if (selectedHorario === null) return;

        try {
            await api.post('https://localhost:7104/api/ProfissionalSchedule', {
                profissionalId: profissional.id,
                horarioId: selectedHorario,
            });

            setHorarios(prevHorarios => [
                ...prevHorarios,
                availableHorarios.find(horario => horario.id === selectedHorario)!,
            ]);
        } catch (error) {
            console.error('Erro ao adicionar horário:', error);
        }
    };

    const handleDeleteHorario = async (horarioId: number) => {
        try {
            await api.delete(`https://localhost:7104/api/ProfissionalSchedule/${horarioId}`);

            setHorarios(prevHorarios => prevHorarios.filter(horario => horario.id !== horarioId));
        } catch (error) {
            console.error('Erro ao remover horário:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Horários de {profissional.name}</h2>
                <div className="mb-4">
                    <label htmlFor="horarioSelect" className="block text-gray-700 font-semibold mb-2">Adicionar Horário:</label>
                    <select
                        id="horarioSelect"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md "
                        value={selectedHorario || ''}
                        onChange={(e) => setSelectedHorario(parseInt(e.target.value))}
                    >
                        <option value="" disabled className='text-black'>Selecione um horário</option>
                        {availableHorarios.map(horario => (
                            <option key={horario.id} value={horario.id}>
                                {horario.time}
                            </option>
                        ))}
                    </select>
                    <button
                        className="mt-2 bg-orange-800 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddHorario}
                    >
                        Adicionar
                    </button>
                </div>
                <ul className="mb-4">
                    {horarios.map(horario => (
                        <li key={horario.id} className="flex items-center justify-between py-2 border-b border-gray-300">
                            <span>{horario.time}</span>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                onClick={() => handleDeleteHorario(horario.id)}
                            >
                                Remover
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};
