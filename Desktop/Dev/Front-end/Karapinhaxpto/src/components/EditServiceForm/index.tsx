import React, { useState } from 'react';
import { api } from '../../server/api';
import 'tailwindcss/tailwind.css';

interface EditServiceProps {
    id: number;
    initialDescription: string;
    initialPrice: number;
    initialCategoryID: number;
    onSaveSuccess: (updatedService: { id: number; description: string; price: number; category_ID: number }) => void;
}

export const EditServiceForm: React.FC<EditServiceProps> = ({ id, initialDescription, initialPrice, initialCategoryID, onSaveSuccess }) => {
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [categoryID, setCategoryID] = useState(initialCategoryID);

    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseFloat(e.target.value));
    };

    const handleChangeCategoryID = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryID(parseInt(e.target.value, 10));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const updatedService = { id, description, price, category_ID: categoryID };

            await api.put(`https://localhost:7104/api/Service/${id}`, updatedService);
            console.log('Serviço atualizado com sucesso!');
            onSaveSuccess(updatedService);
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={description}
                onChange={handleChangeDescription}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="Descrição do Serviço"
                required
            />
            <input
                type="number"
                value={price}
                onChange={handleChangePrice}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="Preço do Serviço"
                required
            />
            <input
                type="number"
                value={categoryID}
                onChange={handleChangeCategoryID}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="ID da Categoria"
                required
            />
            <button
                type="submit"
                className="bg-brown text-white font-bold py-1 px-3 rounded-md focus:outline-none"
            >
                Salvar Alterações
            </button>
        </form>
    );
};

