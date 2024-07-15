import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../../server/api";
import 'tailwindcss/tailwind.css';

// Definição de tipos para os dados retornados da API
interface Category {
    id: number;
    description: string;
}

interface Service {
    id: number;
    description: string;
    category_ID: number;
}

interface Profissional {
    id: number;
    name: string;
    service: {
        id: number;
        description: string;
    };
}

interface ProfissionalSchedule {
    id: number;
    profissionalId: number;
    scheduleId: number;
    schedule: {
        id: number;
        description: string;
    };
}

export function AppointmentForm() {
    const [formData, setFormData] = useState({
        category: "",
        services: [] as Service[], 
        profissional: "",
        date: "",
        schedule: "" 
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [filteredProfissionals, setFilteredProfissionals] = useState<Profissional[]>([]);
    const [profissionals, setProfissionals] = useState<Profissional[]>([]);
    const [profissionalSchedules, setProfissionalSchedules] = useState<ProfissionalSchedule[]>([]);
    const [filteredSchedules, setFilteredSchedules] = useState<ProfissionalSchedule[]>([]);

    useEffect(() => {
        // Função para carregar categorias
        api.get<Category[]>('https://localhost:7104/api/Category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias!', error);
            });

        // Função para carregar serviços
        api.get<Service[]>('https://localhost:7104/api/Service')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar serviços!', error);
            });

        // Função para carregar profissionais
        api.get<Profissional[]>('https://localhost:7104/api/Profissional')
            .then(response => {
                setProfissionals(response.data);

            })
            .catch(error => {
                console.error('Erro ao buscar profissionais!', error);
            });

        // Função para carregar profissionalSchedules
        api.get<ProfissionalSchedule[]>('https://localhost:7104/api/ProfissionalSchedule')
            .then(response => {
                setProfissionalSchedules(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar horários dos profissionais!', error);
            });
    }, []);

    const handleServiceClick = (service: Service) => {
        const isSelected = formData.services.some(s => s.id === service.id);

        if (isSelected) {
            // Remove o serviço se já estiver selecionado
            setFormData(prevFormData => ({
                ...prevFormData,
                services: prevFormData.services.filter(s => s.id !== service.id),
            }));
        } else {
            // Adiciona o serviço se ainda não estiver selecionado
            setFormData(prevFormData => ({
                ...prevFormData,
                services: [...prevFormData.services, service],
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newAppointment = {
            AppointmentId: 1, 
            CategoryId: parseInt(formData.category), // ID da categoria selecionada
            ServiceId: formData.services[0]?.id || 0, 
            ProfissionalId: parseInt(formData.profissional), 
            ScheduleId: parseInt(formData.schedule), 
            Date: formData.date // Data selecionada no formato 'yyyy-MM-dd'
        };
    
        console.log(newAppointment)
        try {
            const response = await api.post('https://localhost:7104/api/ServiceAppointment', newAppointment);
            console.log('Marcação criada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao criar marcação:', error);
        }

        
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "services") {
            const selectElement = e.target as HTMLSelectElement;
            const selectedServices = Array.from(selectElement.selectedOptions, option => {
                const serviceId = parseInt(option.value);
                //  ! serve para garantir que o serviço seja encontrado
                return services.find(service => service.id === serviceId)!;
            });
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: selectedServices,
            }));
        } else if (name === "schedule") {
            setFormData(prevFormData => ({
                ...prevFormData,
                schedule: value,
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
            if (name === "category") {
                const selectedCategoryId = parseInt(value);
                const filtered = services.filter(service => service.category_ID === selectedCategoryId);
                setFilteredServices(filtered);
            
                const filteredProf = profissionals.filter(profissional =>
                    filtered.some(service => service.id === profissional.service.id)
                );
                setFilteredProfissionals(filteredProf);
            
                setFormData(prevFormData => ({
                    ...prevFormData,
                    category: value,
                }));
            }
            
           else if (name === "profissional") {

                const selectedProfissional = filteredProfissionals.find(profissional => String(profissional.id) === value);
                console.log(selectedProfissional)
                if (selectedProfissional) {
                    const filteredSched = profissionalSchedules.filter(schedule =>
                        schedule.profissionalId === selectedProfissional.id
                    );
                    setFilteredSchedules(filteredSched);
                } else {
                    setFilteredSchedules([]);
                }
            }
        }
    };

    const renderServiceCards = () => {
        return filteredServices.map(service => (
            <div
                key={service.id}
                className={`border border-gray-300 p-4 rounded-md mb-2 cursor-pointer ${formData.services.some(s => s.id === service.id) ? 'bg-blue-100' : ''}`}
                onClick={() => handleServiceClick(service)}
            >
                <h3 className="text-xs font-semibold">{service.description}</h3>
            </div>
        ));
    };

    return (
        <div className="mt-4">
            <div className="mb-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 font-regular mb-2">Categoria:</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id.toString()}>{category.description}</option>
                            ))}
                        </select>
                        
                    </div>

                    {/* //cartões de seleção dos serviços */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-regular mb-2">Serviços/Tratamentos:</label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                            {renderServiceCards()}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profissional" className="block text-gray-700 font-regular mb-2">Profissional:</label>
                        <select
                            id="profissional"
                            name="profissional"
                            value={formData.profissional}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                            required
                        >
                            <option value="">Selecione um profissional</option>
                            {filteredProfissionals.map(profissional => (
                                <option key={profissional.id} value={profissional.id.toString()}>{profissional.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="schedule" className="block text-gray-700 font-regular mb-2">Horário:</label>
                        <select
                            id="schedule"
                            name="schedule"
                            value={formData.schedule}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                            required
                        >
                            <option value="">Selecione um horário</option>
                            {filteredSchedules.map(schedule => (
                                <option key={schedule.id} value={schedule.schedule.id.toString()}>{schedule.schedule.description}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 font-regular mb-2">Data:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mb-4 bg-brown font-bold text-white py-2 rounded-md hover:bg-amber-900 focus:outline-none"
                    >
                        Solicitar Marcação
                    </button>
                </form>
            </div>
        </div>
    );
}





