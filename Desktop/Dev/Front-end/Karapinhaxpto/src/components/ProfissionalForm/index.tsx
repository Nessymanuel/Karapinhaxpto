import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { api } from '../../server/api';
import 'tailwindcss/tailwind.css';

interface Service {
    id: number;
    description: string;
}

interface ProfissionalFormProps {
    onClose: () => void;
}

export const ProfissionalForm: React.FC<ProfissionalFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        service_ID: '',
        email: '',
        photo: '',
        phone: '',
        idCard: '',
    });

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('https://localhost:7104/api/Service');
                console.log('Serviços obtidos:', response.data); // Log da resposta da API
                setServices(response.data);
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
            }
        };

        fetchServices();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newProfissional = {
                name: formData.name,
                service_ID: Number(formData.service_ID),
                email: formData.email,
                photo: formData.photo,
                phone: formData.phone,
                id_Card: formData.idCard,
            };

            const response = await api.post('https://localhost:7104/api/Profissional', newProfissional);
            console.log('Profissional adicionado com sucesso!', response.data);
            onClose();
        } catch (error) {
            console.error('Erro ao adicionar profissional:', error);
        }
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-regular mb-2">
                        Nome do Profissional:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="service_ID" className="block text-gray-700 font-regular mb-2">
                        Serviço:
                    </label>
                    <select
                        id="service_ID"
                        name="service_ID"
                        value={formData.service_ID}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        required
                    >
                        <option value="">Selecione um serviço</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.description}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-regular mb-2">
                        E-mail do Profissional:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="photo" className="block text-gray-700 font-regular mb-2">
                        URL da Foto do Profissional:
                    </label>
                    <input
                        type="text"
                        id="photo"
                        name="photo"
                        value={formData.photo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-regular mb-2">
                        Telefone do Profissional:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="idCard" className="block text-gray-700 font-regular mb-2">
                        Número de Identidade do Profissional:
                    </label>
                    <input
                        type="text"
                        id="idCard"
                        name="idCard"
                        value={formData.idCard}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mb-4 bg-brown font-bold text-white py-2 rounded-md hover:bg-amber-900 focus:outline-none"
                >
                    Adicionar Profissional
                </button>
            </form>
        </div>
    );
};

