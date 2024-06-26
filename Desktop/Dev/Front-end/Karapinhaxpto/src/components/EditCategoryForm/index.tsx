import React, { useState } from 'react';
import { api } from '../../server/api';

interface Category {
    id: number;
    description: string;
}

interface EditCategoryFormProps {
    id: number;
    initialDescription: string;
    onSaveSuccess: () => void;
}

export const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ id, initialDescription, onSaveSuccess }) => {
    const [description, setDescription] = useState(initialDescription);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const updatedCategory = {
                id: id,
                description: description,
            };

            const response = await api.put(`https://localhost:7104/api/Category/${id}`, updatedCategory);
            console.log('Categoria atualizada com sucesso:', response.data);

            onSaveSuccess();
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-regular mb-2">
                    Descrição da Categoria:
                </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md focus:outline-none"
            >
                Atualizar Categoria
            </button>
        </form>
    );
};
