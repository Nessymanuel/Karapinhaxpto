

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserProfile } from '../../components/UserProfile';
import AdminManagement from '../../components/AdminManagement';

interface User {
    id: number;
    name: string;
    email: string;
    profileId: number;
    activate: boolean;
    blocked: boolean;
}

export function AdmDashboard() {
    const [activeSection, setActiveSection] = useState('clientes');
    const [isAdminFormOpen, setIsAdminFormOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>('https://localhost:7104/api/User');
            const filteredUsers = response.data.filter(user => user.profileId === 1);
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    

    const handleActivateAccount = async (userId: number) => {
        try {
            const response = await axios.get(`https://localhost:7104/api/User/activate/${userId}`);
            if (response.status === 200) {
                const updatedUsers = users.map(user =>
                    user.id === userId ? { ...user, activate: true } : user
                );
                setUsers(updatedUsers);
                console.log(`Conta do usuário ${userId} ativada.`);
                alert("oi")
            } else {
                console.error(`Erro ao ativar conta do usuário ${userId}. Status: ${response.status}`);
            }

            fetchUsers();
        } catch (error) {
            console.error(`Erro ao ativar conta do usuário ${userId}:`, error);
        }
    };

    const handleToggleBlock = async (userId: number) => {
        try {
            
            const updatedUsers = users.map(user =>
                user.id === userId ? { ...user, blocked: !user.blocked } : user
            );
            setUsers(updatedUsers);
            console.log(`Conta do usuário ${userId} bloqueada/desbloqueada.`);
        } catch (error) {
            console.error(`Erro ao bloquear/desbloquear conta do usuário ${userId}:`, error);
        }
    };

    // const renderBlockedScreen = () => (
    //     <div className="container mx-auto mt-8 text-center">
    //         <h1 className="text-3xl font-bold mb-4">Conta Bloqueada</h1>
    //         <p className="text-gray-600">Consulte o administrador para mais informações.</p>
    //     </div>
    // );

    const renderUsersList = () => {
        return (
            <div className="mt-4">
                {/* <button
                    className="mt-4 bg-brown text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsAdminFormOpen(true)}
                >
                    Registrar Administrativo
                </button> */}
                <h2 className="text-xl font-semibold mb-2">Lista de Clientes</h2>
                <ul className="divide-y divide-gray-300">
                    {users.map((user: User) => (
                        <li key={user.id} className="flex justify-between items-center py-2">
                            <div>
                                <span className="font-bold">{user.name}</span>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className={`py-1 px-3 rounded ${user.activate ? 'bg-green cursor-not-allowed' : 'bg-red-600 text-white'}`}
                                    onClick={() => handleActivateAccount(user.id)}
                                    disabled={user.activate}
                                >
                                    {user.activate ? 'Conta Ativada' : 'Ativar Conta'}
                                </button>
                                <button
                                    className={`py-1 px-3 rounded ${user.blocked ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}
                                    onClick={() => handleToggleBlock(user.id)}
                                >
                                    {user.blocked ? 'Desbloquear' : 'Bloquear'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                
            </div>
        );
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'clientes':
                return renderUsersList();
            case 'administrativos':
                return <AdminManagement onClose={() => setIsAdminFormOpen(false)} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard Administrador</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/6 lg:w-1/5">
                <UserProfile
                        user={{
                            username: 'Nome do Administrador',
                            ID_Card: '123456789',
                            fullName: 'Gracieth',
                            email: 'admin@example.com',
                            phone: '123-456-7890',
                            photo: 'https://via.placeholder.com/150',
                        }}
                        logout={() => {
                            console.log("Logout function called");
                        }}
                    />
                </div>

                <div className="flex-grow">
                    <div className="flex space-x-4 mb-4">
                        <button
                            className={`px-4 py-2 rounded-md ${activeSection === 'clientes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('clientes')}
                        >
                            Clientes
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${activeSection === 'administrativos' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('administrativos')}
                        >
                            Administrativos
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {renderContent()}
                    </div>
                </div>
            </div>

            {/* {isAdminFormOpen && <AdminManagement onClose={() => setIsAdminFormOpen(false)} />}       */}
        </div>
    );
}

