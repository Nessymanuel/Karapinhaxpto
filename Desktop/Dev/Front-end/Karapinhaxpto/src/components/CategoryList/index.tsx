import React from 'react';
import { api } from '../../server/api';
import 'tailwindcss/tailwind.css';

interface Category {
    id: number;
    description: string;
}

interface CategoryListProps {
    categories: Category[];
    onEdit: (id: number, description: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit }) => {

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            try {
                await api.delete(`https://localhost:7104/api/Category/${id}`);
                console.log('Categoria excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir categoria:', error);
            }
        }
    };

    const handleEdit = (id: number, description: string) => {
        onEdit(id, description);
    };

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Lista de Categorias</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id} className="flex items-center justify-between py-2 border-b border-gray-300">
                        <div className="flex items-center">
                            <span className="mr-4">{category.description}</span>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                                onClick={() => handleEdit(category.id, category.description)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                onClick={() => handleDelete(category.id)}
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
