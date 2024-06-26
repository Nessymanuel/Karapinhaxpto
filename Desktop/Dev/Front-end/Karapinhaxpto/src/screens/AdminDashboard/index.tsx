import React, { useState } from 'react';
import { UserProfile } from '../../components/UserProfile';
import { ManageCategories } from '../../components/ManageCategories';
import { CategoryForm } from '../../components/CategoryForm';
import { ServiceForm } from '../../components/ServiceForm';
import { ManageServices } from '../../components/ManageServices';
import ManageProfessional from '../../components/ManegeProfissional';
import { ProfissionalForm } from '../../components/ProfissionalForm';

export function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('categorias');
    const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
    const [isProfissionalFormOpen, setIsProfissionalFormOpen] = useState(false);

    

    const renderContent = () => {
        switch (activeSection) {
            case 'profissionais':
                return (
                    <>
                    {isProfissionalFormOpen && <ProfissionalForm onClose={() => setIsProfissionalFormOpen(false)} />}
                        <button
                            onClick={() => setIsProfissionalFormOpen(true)}
                            className="bg-brown   text-white font-bold py-2 px-4 rounded"
                        >
                            Novo
                        </button>
                       
                        <ManageProfessional />
                    </>
                );
            case 'servicos':
                return (
                    <>
                        {isServiceFormOpen && <ServiceForm onClose={() => setIsServiceFormOpen(false)} />}
                        <button
                            onClick={() => setIsServiceFormOpen(true)}
                            className="bg-brown   text-white font-bold py-2 px-4 rounded"
                        >
                            Novo
                        </button>
                        <ManageServices />
                    </>
                );
            case 'categorias':
                return (
                    <>
                        <CategoryForm />
                        <ManageCategories />
                    </>
                );
            case 'marcacoes':
                return <div>Componente de Marcações</div>;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard Administrativa</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                
                {/* Coluna do UserProfile */}
                <div className="md:w-1/6 lg:w-1/5">
                    <UserProfile
                        userData={{
                            username: 'Nome do Administrador',
                            ID_Card: '123456789',
                            fullName: 'Gracieth',
                            email: 'admin@example.com',
                            phone: '123-456-7890',
                            photo: 'https://via.placeholder.com/150',
                        }}
                    />
                </div>

                {/* Coluna do Conteúdo */}
                <div className="flex-grow">
                    {/* Menu para navegação entre diferentes seções */}
                    <div className="flex space-x-4 mb-4">
                        <button
                            className={`px-4 py-2 rounded-md ${activeSection === 'profissionais' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('profissionais')}
                        >
                            Profissionais
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${activeSection === 'servicos' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('servicos')}
                        >
                            Serviços
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${activeSection === 'categorias' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('categorias')}
                        >
                            Categorias
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${activeSection === 'marcacoes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('marcacoes')}
                        >
                            Marcações
                        </button>
                    </div>

                    {/* Conteúdo dinâmico com base na seção ativa */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
