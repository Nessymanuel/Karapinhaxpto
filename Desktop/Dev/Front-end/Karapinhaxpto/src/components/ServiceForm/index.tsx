import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { api } from '../../server/api';
import 'tailwindcss/tailwind.css';

interface ServiceFormProps {
    onClose: () => void;
}

interface Category {
    id: number;
    description: string;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ onClose }) => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<string>(''); // Price como string para facilitar a validação
    const [categoryId, setCategoryId] = useState<number | ''>(''); // State para armazenar o ID da categoria selecionada
    const [categories, setCategories] = useState<Category[]>([]); // State para armazenar as categorias disponíveis

    useEffect(() => {
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

    const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        // Verifica se o valor inserido é numérico
        if (!isNaN(Number(e.target.value))) {
            setPrice(e.target.value);
        }
    };

    const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(parseInt(e.target.value, 10));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar se o preço é um número válido
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            alert('Formato de dados inválido para o preço. Insira um número positivo.');
            return;
        }

        try {
            const newService = {
                description,
                price: parsedPrice,
                category_ID: categoryId // Incluímos o category_ID no objeto newService
            };

            await api.post('https://localhost:7104/api/Service', newService);
            console.log('Serviço adicionado com sucesso!');
            onClose();
        } catch (error) {
            console.error('Erro ao adicionar serviço:', error);
        }
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-regular mb-2">
                        Descrição do Serviço:
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChangeDescription}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        placeholder="Descrição do Serviço"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-regular mb-2">
                        Preço do Serviço:
                    </label>
                    <input
                        type="text" // Alterado de "number" para "text"
                        id="price"
                        name="price"
                        value={price}
                        onChange={handleChangePrice}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        placeholder="Preço do Serviço"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categoryId" className="block text-gray-700 font-regular mb-2">
                        Categoria do Serviço:
                    </label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={categoryId}
                        onChange={handleChangeCategory}
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.description}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full mb-4 bg-brown font-bold text-white py-2 rounded-md hover:bg-amber-900 focus:outline-none"
                >
                    Adicionar Serviço
                </button>
            </form>
        </div>
    );
};

