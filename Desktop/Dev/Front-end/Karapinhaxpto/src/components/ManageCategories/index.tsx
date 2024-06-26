import React, { useState, useEffect } from 'react';
import { api } from '../../server/api';
import { CategoryList } from '../CategoryList';
import { EditCategoryForm } from '../EditCategoryForm';
import 'tailwindcss/tailwind.css';

interface Category {
    id: number;
    description: string;
}

export const ManageCategories: React.FC = () => {
    const [editingCategory, setEditingCategory] = useState<{ id: number; description: string } | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleEdit = (id: number, description: string) => {
        setEditingCategory({ id, description });
    };

    const handleSaveSuccess = (updatedCategory: Category) => {
        setCategories(prevCategories =>
            prevCategories.map(category =>
                category.id === updatedCategory.id ? updatedCategory : category
            )
        );
        setEditingCategory(null);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Filtrar as categorias com base na query de busca
    const filteredCategories = categories.filter(category =>
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Gerenciar Categorias</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar categorias..."
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                />
            </div>
            <CategoryList categories={filteredCategories} onEdit={handleEdit} />
            {editingCategory && (
                <div className="mb-4">
                    <EditCategoryForm
                        id={editingCategory.id}
                        initialDescription={editingCategory.description}
                        onSaveSuccess={() => handleSaveSuccess(editingCategory)}
                    />
                </div>
            )}
        </div>
    );
};


