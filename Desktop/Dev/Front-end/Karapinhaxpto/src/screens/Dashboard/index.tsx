import React, { useState, useEffect } from "react";
import { api } from "../../server/api";
import { AppointmentForm } from "../AppointtmentForm";
 import { useAuth } from "../../context/AuthContext";


export function Dashboard() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [tempUserData, setTempUserData] = useState<any>({});
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {user}= useAuth();
  // Função para simular busca de dados do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulação de dados do usuário obtidos da API
        const response = {
          data: {
            username: user?.username,
            name: user?.fullName,
            email: user?.email,
            phone: user?.phone,
            photo: "https://via.placeholder.com/150", // URL da foto do usuário
            ID_Card: user?.iD_Card,
            fullName: user?.username,
            password: "", // Omitido por questões de segurança
          },
        };
        setUserData(response.data);
        setTempUserData(response.data); // Inicializa os dados temporários com os dados atuais do usuário
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; 
  };

  const handleEdit = () => {
    setEditMode(true);
    setFileInputVisible(true); 
  };

  const handleSave = () => {
    setUserData(tempUserData); 
    setEditMode(false); 
    setFileInputVisible(false); 

    // Se houver uma imagem selecionada, atualiza a foto do usuário
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData: any) => ({
          ...prevData,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file); // Armazena o arquivo selecionado no estado
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUserData((prevData: any) => ({
          ...prevData,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Lateral Esquerda (Fixa) */}
        <div className="md:col-span-1 sticky top-0">

          {/* Perfil do Usuário */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:sticky md:top-0">
            <div className="flex items-center mb-4">
              <label htmlFor="file-upload" className={`cursor-pointer ${editMode ? 'opacity-100' : 'opacity-100'} transition-opacity duration-300`}>
                <img
                  src={tempUserData.photo}
                  alt="Foto do usuário"
                  className="w-12 h-12 rounded-full mr-4"
                />
              </label>
              {editMode && (
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold">{userData.username}</h2>
                <p className="text-gray-600">Id: {userData.ID_Card}</p>
              </div>
            </div>
            {editMode ? (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <input
                    type="text"
                    name="fullName"
                    value={tempUserData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={tempUserData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={tempUserData.phone}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
            ) : (
              <div>
                <p><strong>Nome Completo:</strong> {userData.fullName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Telefone:</strong> {userData.phone}</p>
              </div>
            )}
            <div className="mt-4">
              {editMode ? (
                <button
                  onClick={handleSave}
                  className={`bg-brown   text-white py-2 px-4 rounded-md shadow-md transition duration-300 mr-2`}
                >
                  Salvar
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 mr-2`}
                >
                  Editar
                </button>
              )}
              <button
                onClick={logout}
                className={`bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300`}
              >
                Logout
              </button>
            </div>
          </div>
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
