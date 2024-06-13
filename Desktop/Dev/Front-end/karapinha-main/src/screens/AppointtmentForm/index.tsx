import React, { FormEvent, useEffect, useState } from "react";
import axios from 'axios';
import { api } from "../../server/api";
import 'tailwindcss/tailwind.css';

export function AppointmentForm() {
    const [formData, setFormData] = useState({
        category: "",
        service: "",
        professional: "",
        date: "",
        time: ""
    });

    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [filteredProfissional, setFilteredProfissional] = useState([]);
    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        // Função para carregar categorias
        api.get('/Category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias!', error);
            });

        // Função para carregar serviços
        api.get('/Service')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar serviços!', error);
            });

        // Função para carregar profissionais
        api.get('/Profissional')
            .then(response => {
                setProfessionals(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar profissionais!', error);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
        const selectCategory: any = categories.find((category: any) => category.description == e.target.value)
        const selectProfissional: any = professionals.filter((profissional: any) => profissional.category_ID == selectCategory.id)


        if(!selectCategory){
            return ""
        }else if(selectCategory){
            const filtered = services.filter((service: any) => service.category_ID === selectCategory.id);
            setFilteredServices(filtered);
            setFilteredProfissional(selectProfissional)
        }

    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
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
                            {categories.map((category: any) => (
                                <option key={category.id} value={category.description}>{category.description}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="service" className="block text-gray-700 font-regular mb-2">Serviço/Tratamento:</label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                            required
                        >
                            <option value="">Selecione um serviço</option>
                            {
                            filteredServices.map((service: any) => (
                                <option key={service.id} value={service.description}>{service.description}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="professional" className="block text-gray-700 font-regular mb-2">Profissional:</label>
                        <select
                            id="professional"
                            name="professional"
                            value={formData.professional}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                            required
                        >
                            <option value="">Selecione um profissional</option>
                            {filteredProfissional.map((professional: any) => (
                                <option key={professional.id} value={professional.description}>{professional.description}</option>
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
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-gray-700 font-regular mb-2">Hora:</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
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
