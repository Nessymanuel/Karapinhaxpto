import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../components/UserProfile';
import { ManageCategories } from '../../components/ManageCategories';
import { CategoryForm } from '../../components/CategoryForm';
import { ServiceForm } from '../../components/ServiceForm';
import { ManageServices } from '../../components/ManageServices';
import ManageProfessional from '../../components/ManegeProfissional';
import { ProfissionalForm } from '../../components/ProfissionalForm';

interface Appointment {
    id: number;
    professional: string;
    service: string;
    price: number;
    date: string;
    time: string;
}

interface ProfessionalData {
    id: number;
    name: string;
    appointments: number;
}

export function AdminDashboard() {
    const [activeSection, setActiveSection] = useState<string>('categorias');
    const [isServiceFormOpen, setIsServiceFormOpen] = useState<boolean>(false);
    const [isProfissionalFormOpen, setIsProfissionalFormOpen] = useState<boolean>(false);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [mostRequestedService, setMostRequestedService] = useState<string>('');
    const [leastRequestedService, setLeastRequestedService] = useState<string>('');
    const [topProfessionals, setTopProfessionals] = useState<ProfessionalData[]>([]);
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('https://localhost:7104/api/ServiceAppointment');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            
            // Extrair dados necessários da resposta da API
            const extractedAppointments: Appointment[] = data.map((item: any) => ({
                id: item.id,
                professional: item.profissional.name,
                service: item.service.description,
                price: item.service.price,
                date: item.date,
                time: item.schedule.description,
            }));
            setAppointments(extractedAppointments);

            // Calcular o total faturado
            const total = data.reduce((acc: number, item: any) => acc + item.service.price, 0);
            setTotalRevenue(total);

            // Encontrar o serviço mais solicitado
            const mostRequested = findMostRequestedService(data);
            setMostRequestedService(mostRequested);

            // Encontrar o serviço menos solicitado
            const leastRequested = findLeastRequestedService(data);
            setLeastRequestedService(leastRequested);

            // Encontrar os top 5 profissionais
            const topProfessionalsData = findTopProfessionals(data);
            setTopProfessionals(topProfessionalsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const findMostRequestedService = (data: any[]): string => {
        return data[0]?.service?.description || '';
    };

    const findLeastRequestedService = (data: any[]): string => {
        return data[data.length - 1]?.service?.description || '';
    };

    const findTopProfessionals = (data: any[]): ProfessionalData[] => {
        return data.slice(0, 5).map((item: any, index: number) => ({
            id: item.profissional.id,
            name: item.profissional.name,
            appointments: index + 1, 
        }));
    };

    const handleConfirmation = (id: number) => {
       
    };

    const handleReschedule = (id: number) => {
        alert(`Reagendar Marcação ${id}.`);
    };


    const renderAppointments = () => {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Gestão de Marcações</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Profissional
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Serviço
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Preço
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Data
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Horário
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment.professional}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment.service}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                     {appointment.price.toFixed(2)} Kz
                                 </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(appointment.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleConfirmation(appointment.id)}
                                        className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-3 rounded mr-2"
                                    >  
                                        Confirmar
                                    </button>
                                    <button
                                        onClick={() => handleReschedule(appointment.id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                                    >
                                        Reagendar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderDashboard = () => {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-bold mb-2">Valor Faturado</h3>
                        <p className="text-gray-600">{totalRevenue.toFixed(2)} Kz</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-bold mb-2">Serviço Mais Solicitado</h3>
                        <p className="text-gray-600">{mostRequestedService}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-bold mb-2">Serviço Menos Solicitado</h3>
                        <p className="text-gray-600">{leastRequestedService}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-bold mb-2">Top 5 Profissionais</h3>
                        <ul className="divide-y divide-gray-200">
                            {topProfessionals.map((professional) => (
                                <li key={professional.id} className="py-2">
                                    <span className="font-medium">{professional.name}</span> -
                                    <span className="text-gray-600 ml-2">{professional.appointments} marcações</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'profissionais':
                return (
                    <>
                        {isProfissionalFormOpen && <ProfissionalForm onClose={() => setIsProfissionalFormOpen(false)} />}
                        <button
                            onClick={() => setIsProfissionalFormOpen(true)}
                            className="bg-brown text-white font-bold py-2 px-4 rounded"
                        >
                            Novo
                        </button>
                        <ManageProfessional />
                    </>
                );
            case 'categorias':
                return (
                    <>
                        <ManageCategories />
                        <CategoryForm />
                    </>
                );
            case 'serviços':
                return (
                    <>
                        {isServiceFormOpen && <ServiceForm onClose={() => setIsServiceFormOpen(false)} />}
                        <button
                            onClick={() => setIsServiceFormOpen(true)}
                            className="bg-brown text-white font-bold py-2 px-4 rounded"
                        >
                            Novo
                        </button>
                        <ManageServices />
                    </>
                );
            case 'marcações':
                return renderAppointments();
            case 'dashboard':
                return renderDashboard();
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
                            className={`px-4 py-2 rounded-md ${activeSection === 'serviços' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('serviços')}
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
                            className={`px-4 py-2 rounded-md ${activeSection === 'marcações' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('marcações')}
                        >
                            Marcações
                        </button>
                        
                        <button
                            className={`px-4 py-2 rounded-md ${activeSection === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveSection('dashboard')}
                        >
                            Dashboard
                        </button>
                    </div>

                    {/* Conteúdo dinâmico baseado na seção ativa */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}


