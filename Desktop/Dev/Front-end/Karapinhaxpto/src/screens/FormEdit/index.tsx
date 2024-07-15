import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../server/api';


export function FormEdit() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setFormData(prevFormData => ({
        ...prevFormData,
        email: storedEmail,
      }));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAlertMessage('As senhas não coincidem.');
      return;
    }
    try {
      const dataToSend = {
        id: user?.id,
        fullName: user?.fullName,
        password: formData.password,
        email: user?.email,
        phone: user?.phone,
        photo: user?.photo,
        iD_Card: user?.iD_Card,
        username: user?.username,
        profileId: 3,
        activate: true,
        status: true,
      };
      
      // {
      //   "id": 0,
      //   "fullName": "string",
      //   "password": "string",
      //   "email": "string",
      //   "phone": "string",
      //   "photo": "string",
      //   "iD_Card": "string",
      //   "username": "string",
      //   "profileId": 0,
      //   "activate": true,
      //   "status": true
      // }

      console.log(dataToSend)
       const response = await api.put(`/User/${user?.id}`,dataToSend);

      // console.log(response.data);
      // console.log(dataToSend)

      alert('Senha atualizada com sucesso!');

      navigate('/Dashboard'); // Redireciona para a Dashboard após atualização
    } catch (error) {
      
    
    }
  };

  return (
    <div className="bg-bege w-screen h-auto py-10">
      <h1 className="text-black text-lg font-bold text-center pb-4">Formulário para validação da conta do administrativo</h1>
      <div className="max-w-md mx-auto p-6 bg-white shadow-s rounded-md">
        <form onSubmit={handleSubmit}>
          {alertMessage && <p className="text-red-500">{alertMessage}</p>}

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-regular mb-2">Nova Palavra-passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nova Palavra-passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-regular mb-2">Confirme a Nova Palavra-passe:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirme a Nova Palavra-passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-brown font-bold text-white py-2 rounded-md hover:bg-amber-900 focus:outline-none"
          >
            Atualizar Senha
          </button>
        </form>
      </div>
    </div>
  );
}
