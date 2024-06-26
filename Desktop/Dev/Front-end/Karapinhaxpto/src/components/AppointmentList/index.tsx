import React, { useState, useEffect } from 'react';
import { api } from '../../server/api';

interface Appointment {
    id: string;
    date: string;
    time: string;
}

export const AppointmentList: React.FC = () => {
    const [marcacoes, setMarcacoes] = useState<Appointment[]>([]);

    useEffect(() => {
        const fetchMarcacoes = async () => {
            try {
                const response = await api.get('https://localhost:7104/api/Appointment');
                setMarcacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar marcações:', error);
            }
        };

        fetchMarcacoes();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Marcações</h2>
            <ul>
                {marcacoes.map(appointment => (
                    <li key={appointment.id} className="mb-2 border-b border-gray-300 pb-2">
                        <p>Data: {appointment.date}</p>
                        <p>Hora: {appointment.time}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
