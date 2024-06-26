import React, { useState } from 'react';
import { ServiceList } from '../ServiceList';
import { ServiceForm } from '../ServiceForm';
import { EditServiceForm } from '../EditServiceForm';
import 'tailwindcss/tailwind.css';

interface Service {
    id: number;
    description: string;
    price: number;
    category_ID: number;
}

export const ManageServices: React.FC = () => {
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleEdit = (id: number, description: string, price: number, category_ID: number) => {
        setEditingService({ id, description, price, category_ID });
    };

    const handleSaveSuccess = (updatedService: Service) => {
        setEditingService(null);
        
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Gerenciar Serviços</h1>
            
            {isServiceFormOpen && <ServiceForm onClose={() => setIsServiceFormOpen(false)} />}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar serviços..."
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none"
                />
            </div>
            <div className="grid">
                <div>
                    <ServiceList onEdit={handleEdit} searchQuery={searchQuery} />
                    {editingService && (
                        <EditServiceForm
                            id={editingService.id}
                            initialDescription={editingService.description}
                            initialPrice={editingService.price}
                            initialCategoryID={editingService.category_ID}
                            onSaveSuccess={handleSaveSuccess}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
