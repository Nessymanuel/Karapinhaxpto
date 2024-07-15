import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface UserProfileProps {
  user: any;
  logout: () => void;
}


export const UserProfile: React.FC<UserProfileProps> = ({  logout }) => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [tempUserData, setTempUserData] = useState<any>({});
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        const response = storedUserData
          ? JSON.parse(storedUserData)
          : {
              username: user?.username,
              name: user?.fullName,
              id: user?.id,
              email: user?.email,
              phone: user?.phone,
              photo: "https://via.placeholder.com/150",
              ID_Card: user?.iD_Card,
              fullName: user?.username,
              password: "",
            };
        setUserData(response);
        setTempUserData(response);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEdit = () => {
    
    console.log(tempUserData)
    setEditMode(true);
    setFileInputVisible(true);
  };

  const handleSave = async () => {
    try {
      // Atualiza os dados no localStorage
      setUserData(tempUserData);
      setEditMode(false);
      setFileInputVisible(false);
      localStorage.setItem("userData", JSON.stringify(tempUserData));

      // Atualiza os dados no servidor
      const userId = user?.id; 
      await axios.put(`https://localhost:7104/api/User/${userId}`, tempUserData);

      
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
    } catch (error) {
      console.error("Erro ao salvar os dados do usuário:", error);
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
      setSelectedFile(file);
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
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
            className={`bg-brown text-white py-2 px-4 rounded-md shadow-md transition duration-300 mr-2`}
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
  );
};
