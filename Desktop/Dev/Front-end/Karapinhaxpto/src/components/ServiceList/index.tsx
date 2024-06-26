import React, { useState, useEffect } from 'react';
import { api } from '../../server/api';
import 'tailwindcss/tailwind.css';

interface Service {
    id: number;
    description: string;
    price: number;
    category_ID: number;
    category: string | null; // categoria é opcional, então pode ser string ou null
}

interface ServiceListProps {
    onEdit: (id: number, description: string, price: number, category_ID: number) => void;
    searchQuery: string;
}

export const ServiceList: React.FC<ServiceListProps> = ({ onEdit, searchQuery }) => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('https://localhost:7104/api/Service');
                // Verifica se response.data é um array antes de setar services
                if (Array.isArray(response.data)) {
                    const formattedServices = response.data.map((service: any) => ({
                        id: service.id,
                        description: service.description,
                        price: service.price,
                        category_ID: service.category_ID,
                        category: service.category || null // categoria pode ser null se não estiver presente
                    }));
                    setServices(formattedServices);
                } else {
                    console.error('Formato de dados inválido:', response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            try {
                await api.delete(`https://localhost:7104/api/Service/${id}`);
                setServices(prevServices => prevServices.filter(service => service.id !== id));
                console.log('Serviço excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir serviço:', error);
            }
        }
    };

    const filteredServices = services.filter(service =>
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Lista de Serviços</h2>
            <ul>
                {filteredServices.map(service => (
                    <li key={service.id} className="flex items-center justify-between py-2 border-b border-gray-300">
                        <div>
                            <h3 className="text-lg">{service.description}</h3>
                            <p className="text-gray-600">Preço:  {service.price.toFixed(2)} kz</p>
                            <p className="text-gray-600">Categoria: {service.category || 'N/A'}</p>
                        </div>
                        <div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                                onClick={() => onEdit(service.id, service.description, service.price, service.category_ID)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                onClick={() => handleDelete(service.id)}
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

