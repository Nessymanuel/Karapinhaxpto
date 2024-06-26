import React, { useState } from 'react';
import { ProfissionalForm } from '../ProfissionalForm';
import { ProfissionalList } from '../ProfissionalList';
import { EditProfissionalForm } from '../EditProfissionalForm';

interface Profissional {
    id: number;
    name: string;
    service_ID: number;
    email: string;
    photo: string;
    phone: string;
    id_Card: string;
}

const ManageProfessional: React.FC = () => {
    const [editingProfessional, setEditingProfessional] = useState<Profissional | null>(null);
    const [addingProfessional, setAddingProfessional] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleEditProfessional = (
        id: number,
        name: string,
        service_ID: number,
        email: string,
        photo: string,
        phone: string,
        id_Card: string
    ) => {
        setEditingProfessional({
            id,
            name,
            service_ID,
            email,
            photo,
            phone,
            id_Card
        });
    };

    const handleAddProfessional = () => {
        setAddingProfessional(true);
    };

    const handleCloseModals = () => {
        setEditingProfessional(null);
        setAddingProfessional(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-4">Gerenciamento de Profissionais</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Profissionais</h2>
                <ProfissionalList onEdit={handleEditProfessional} searchQuery={searchQuery} />
                <button
                    onClick={handleAddProfessional}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none"
                >
                    Adicionar Profissional
                </button>
                {editingProfessional && (
                    <EditProfissionalForm
                        id={editingProfessional.id}
                        initialName={editingProfessional.name}
                        initialCategoryID={editingProfessional.service_ID}
                        initialEmail={editingProfessional.email}
                        initialPhoto={editingProfessional.photo}
                        initialPhone={editingProfessional.phone}
                        initialIdCard={editingProfessional.id_Card}
                        onSaveSuccess={() => handleCloseModals()}
                    />
                )}
                {addingProfessional && <ProfissionalForm onClose={() => handleCloseModals()} />}
            </div>
        </div>
    );
};

export default ManageProfessional;
