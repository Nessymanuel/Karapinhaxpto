import React, { useState, useEffect } from "react";
import { api } from "../../server/api";
import { AppointmentForm } from "../AppointtmentForm";
import { Form } from "../../components/Form/index";

export function Dashboard() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do usuário na base de dados
    const fetchUserData = async () => {
      try {
        // Fazer a requisição para o servidor para obter os dados do usuário
        const response = await api.get("/User", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Você precisa incluir um token de autenticação válido aqui
          },
        });

        // Atualizar o estado com os dados do usuário
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    // Chamar a função para buscar os dados do usuário ao montar o componente
    fetchUserData();
  }, []); // O array vazio como segundo argumento garante que o useEffect só será executado uma vez, ao montar o componente

  return (
    <div className="container mx-auto mt-8">

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard do Usuário</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">


          {/* Caixa para Solicitar Marcação */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Solicitar Marcação</h2>
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              className="w-full bg-brown font-bold text-white py-2 rounded-md"
            >
              {showBookingForm ? 'Fechar' : 'Abrir Formulário'}
            </button>
            {showBookingForm && (
              <AppointmentForm />
            )}
          </div>

          {/* Caixa para Alterar Dados de Registro */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Alterar Dados de Registro</h2>
            <button
              onClick={() => setShowEditForm(!showEditForm)}
              className="w-full bg-brown font-bold text-white py-2 rounded-md"
            >
              {showEditForm ? 'Fechar' : 'Abrir Formulário'}
            </button>
            {showEditForm && (
              <div className="mt-4">
                <div className="mb-4">
                  <Form />
                </div>

              </div>

            )}
          </div>
        </div>

        {/* Histórico de Marcações */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Minhas Marcações</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Histórico de Marcações</h3>
            <p>Lista de marcações aqui</p>
          </div>
        </div>
      </div>

    </div>

  );
}


