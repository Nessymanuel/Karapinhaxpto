import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { api } from '../../server/api'; 
import 'tailwindcss/tailwind.css';

interface Category {
    id: string;
    description: string;
}

export const CategoryForm: React.FC = () => {
    const [formData, setFormData] = useState({
        description: '',
    });

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Função para carregar categorias existentes
        const fetchCategories = async () => {
            try {
                const response = await api.get('https://localhost:7104/api/Category');
                setCategories(response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { description } = formData;

            const response = await api.post('https://localhost:7104/api/Category', { descripton: description });
            console.log('Categoria registrada:', response.data);

            // Atualizar a lista de categorias após adicionar uma nova
            setCategories(prevCategories => [...prevCategories, response.data]);

            // Limpar o formulário após o envio
            setFormData({
                description: '',
            });
        } catch (error) {
            console.error('Erro ao registrar categoria:', error);
        }
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-regular mb-2">
                        Descrição da Categoria:
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mb-4 bg-brown font-bold text-white py-2 rounded-md hover:bg-amber-900 focus:outline-none"
                >
                    Registrar Categoria
                </button>
            </form>
        </div>
    );
};
