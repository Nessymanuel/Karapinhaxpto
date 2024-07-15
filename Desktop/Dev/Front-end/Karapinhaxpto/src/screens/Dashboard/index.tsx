import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppointmentForm } from "../AppointtmentForm";
import { useAuth } from "../../context/AuthContext";
import { UserProfile } from "../../components/UserProfile";

export function Dashboard() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  // Função para buscar as marcações da API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("https://localhost:7104/api/ServiceAppointment");
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar as marcações:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id: any) => {
    try {
      await axios.delete(`https://localhost:7104/api/ServiceAppointment/${id}`);
    } catch (error) {
      console.error("Erro ao cancelar a marcação:", error);
    }
  };

  const handleEdit = async (id: any) => {
    const newDescription = prompt("Digite a nova descrição da marcação:");
    if (newDescription) {
      try {
        await axios.put(`https://localhost:7104/api/ServiceAppointment/${id}`, { description: newDescription });
        // setAppointments(prevAppointments =>
        //   prevAppointments.map(appointment =>
        //     appointment.id === id ? { ...appointment, description: newDescription } : appointment
        //   )
        // );
      } catch (error) {
        console.error("Erro ao editar a marcação:", error);
      }
    }
  };

  


  const handleConfirmReschedule = (id: any) => {
    alert(`Marcação ${id} reagendada com sucesso!`);
  };

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
            <div className="divide-y divide-gray-200  ">
              {appointments.map((appointment: any) => (
                <div key={appointment.id} className="py-4 flex justify-between">
                  <div>
                    <p><strong>Data:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                    <p><strong>Hora:</strong> {appointment.schedule ? appointment.schedule.description : 'N/A'}</p>
                    <p><strong>Profissional:</strong> {appointment.profissional ? appointment.profissional.name : 'N/A'}</p>
                    <p><strong>Serviços:</strong> {appointment.service ? appointment.service.description : 'N/A'}</p>
                    <p><strong>Preço:</strong> {appointment.service ? (appointment.service.price / 100).toFixed(2) : 'N/A'}</p>
                 
                  </div>
                  
                  <div className="mt-2">
                    <button
                      onClick={() => handleEdit(appointment.id)}
                      className="mr-2 bg-yellow-500 text-black py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="mr-2 bg-red-500 text-black py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleConfirmReschedule(appointment.id)}
                      className="bg-orange-800 text-black py-1 px-3 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Confirmar Reagendamento
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
