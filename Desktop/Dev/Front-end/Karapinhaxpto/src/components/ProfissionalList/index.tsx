import React, { useState, useEffect } from 'react';
import { api } from '../../server/api';
import 'tailwindcss/tailwind.css';

interface Profissional {
    id: number;
    name: string;
    service_ID: number;
    email: string;
    photo: string;
    phone: string;
    id_Card: string;
}

interface Service {
    id: number;
    description: string;
}

interface ProfissionalListProps {
    onEdit: (
        id: number,
        name: string,
        service_ID: number,
        email: string,
        photo: string,
        phone: string,
        id_Card: string
    ) => void;
    searchQuery: string;
}

export const ProfissionalList: React.FC<ProfissionalListProps> = ({ onEdit, searchQuery }) => {
    const [profissionals, setProfissionals] = useState<Profissional[]>([]);
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchProfissionals = async () => {
            try {
                const response = await api.get('https://localhost:7104/api/Profissional');
                if (Array.isArray(response.data)) {
                    const formattedProfissionals = response.data.map((profissional: any) => ({
                        id: profissional.id,
                        name: profissional.name,
                        service_ID: profissional.service_ID,
                        email: profissional.email,
                        photo: profissional.photo,
                        phone: profissional.phone,
                        id_Card: profissional.id_Card,
                    }));
                    setProfissionals(formattedProfissionals);
                } else {
                    console.error('Formato de dados inválido:', response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar profissionals:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const response = await api.get('https://localhost:7104/api/Service');
                setServices(response.data);
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
            }
        };

        fetchProfissionals();
        fetchServices();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este profissional?')) {
            try {
                await api.delete(`https://localhost:7104/api/Profissional/${id}`);
                setProfissionals(prevProfissionals => prevProfissionals.filter(profissional => profissional.id !== id));
                console.log('Profissional excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir profissional:', error);
            }
        }
    };

    const getServiceDescription = (service_ID: number) => {
        const service = services.find(service => service.id === service_ID);
        return service ? service.description : 'Serviço não encontrado';
    };

    const filteredProfissionals = profissionals.filter(profissional =>
        profissional.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Lista de Profissionals</h2>
            <ul>
                {filteredProfissionals.map(profissional => (
                    <li key={profissional.id} className="flex items-center justify-between py-2 border-b border-gray-300">
                        <div>
                            <h3 className="text-lg">{profissional.name}</h3>
                            <p className="text-gray-600">Serviço: {getServiceDescription(profissional.service_ID)}</p>
                            <p className="text-gray-600">E-mail: {profissional.email}</p>
                            <p className="text-gray-600">Telefone: {profissional.phone}</p>
                            <p className="text-gray-600">ID Card: {profissional.id_Card}</p>
                        </div>
                        <div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                                onClick={() =>
                                    onEdit(
                                        profissional.id,
                                        profissional.name,
                                        profissional.service_ID,
                                        profissional.email,
                                        profissional.photo,
                                        profissional.phone,
                                        profissional.id_Card
                                    )
                                }
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                onClick={() => handleDelete(profissional.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
