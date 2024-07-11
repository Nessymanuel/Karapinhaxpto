import React, { useState } from "react";
import { AppointmentForm } from "../AppointtmentForm";
import { useAuth } from "../../context/AuthContext";
import { UserProfile } from "../../components/UserProfile"; 

export function Dashboard() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; 
  };

  // Função para adicionar mais marcações fictícias
  const generateAppointments = () => {
    const appointments = [];
    for (let i = 1; i <= 15; i++) {
      appointments.push({
        id: i,
        date: `2024-06-${15 + i}`,
        time: `${10 + i}:00`,
        description: `Descrição da marcação ${i}`,
      });
    }
    return appointments;
  };

  const appointments = generateAppointments();

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Lateral Esquerda (Fixa) */}
        <div className="md:col-span-1 sticky top-0">
          {/* Utilize o componente UserProfile */}
          <UserProfile user={user} logout={logout} />
        </div>

        {/* Resto da Página (Rolável) */}
        <div className="md:col-span-3">
          {/* Caixa para Solicitar Marcação */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Solicitar Marcação</h2>
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              className="w-full bg-brown text-white py-2 rounded-md hover:bg-brown-dark transition duration-300"
            >
              {showBookingForm ? 'Fechar Formulário' : 'Abrir Formulário'}
            </button>
            {showBookingForm && <AppointmentForm />}
          </div>

          {/* Histórico de Marcações */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Minhas Marcações</h2>
            <div className="divide-y divide-gray-200">
              {appointments.map(appointment => (
                <div key={appointment.id} className="py-4">
                  <p><strong>Data:</strong> {appointment.date}</p>
                  <p><strong>Hora:</strong> {appointment.time}</p>
                  <p><strong>Descrição:</strong> {appointment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
