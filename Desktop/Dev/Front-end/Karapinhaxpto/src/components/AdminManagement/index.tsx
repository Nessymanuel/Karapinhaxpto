import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from '../Form';

interface User {
    id: number;
    fullName: string;
    email: string;
    profileId: number;
    activate: boolean;
    status: boolean;
}

interface AdminManagementProps {
    onClose: () => void; // Função para fechar o componente
}

const AdminManagement: React.FC<AdminManagementProps> = ({ onClose }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false); // Estado para controlar a exibição do formulário

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>('https://localhost:7104/api/User');
                const filteredUsers = response.data.filter(user => user.profileId === 3);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Erro ao buscar usuários com profileId=3:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleToggleBlock = async (userId: number) => {
        try {
            // Enviar uma solicitação ao servidor para atualizar o status do usuário
            const user = users.find(user => user.id === userId);
            if (user) {
                const updatedUser = { ...user, status: !user.status };
                await axios.put(`https://localhost:7104/api/User/${userId}`, updatedUser);

                // Atualizar o estado localmente após a atualização bem-sucedida
                setUsers(prevUsers =>
                    prevUsers.map(u =>
                        u.id === userId ? { ...u, status: !u.status } : u
                    )
                );
                console.log(`Conta do usuário ${userId} bloqueada/desbloqueada.`);
            }
        } catch (error) {
            console.error(`Erro ao bloquear/desbloquear conta do usuário ${userId}:`, error);
        }
    };

    return (
        <div>
            {isFormOpen ? (
                <Form profileId={3} onClose={() => setIsFormOpen(false)} />
            ) : (
                <>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Administrativos</h2>
                        </div>
                        <div>
                            <button
                                onClick={() => setIsFormOpen(true)} 
                                className="mt-4 bg-brown text-white font-bold py-2 px-4 rounded"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                    <ul className="divide-y divide-gray-300">
                        {users.map((user: User) => (
                            <li key={user.id} className="flex justify-between items-center py-2">
                                <div>
                                    <span className="font-bold">{user.fullName}</span>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        className={`py-1 px-3 rounded ${user.status ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}
                                        onClick={() => handleToggleBlock(user.id)}
                                    >
                                        {user.status ? 'Bloquear' : 'Desbloquear'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default AdminManagement;


