import React from 'react';

interface NavBarDashboardProps {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}

export const NavBarDashboard: React.FC<NavBarDashboardProps> = ({ selectedTab, setSelectedTab }) => {
    return (
        <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => setSelectedTab('servicos')}
                    className={`mr-4 ${selectedTab === 'servicos' ? 'text-yellow-500' : 'text-white'}`}
                >
                    Serviços
                </button>
                <button
                    onClick={() => setSelectedTab('profissionais')}
                    className={`mr-4 ${selectedTab === 'profissionais' ? 'text-yellow-500' : 'text-white'}`}
                >
                    Profissionais
                </button>
                <button
                    onClick={() => setSelectedTab('marcacoes')}
                    className={`mr-4 ${selectedTab === 'marcacoes' ? 'text-yellow-500' : 'text-white'}`}
                >
                    Marcações
                </button>
                <button
                    onClick={() => setSelectedTab('categorias')}
                    className={`mr-4 ${selectedTab === 'categorias' ? 'text-yellow-500' : 'text-white'}`}
                >
                    Categorias
                </button>
            </div>
        </nav>
    );
};
