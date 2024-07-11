import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

export interface User {
  fullName: string;
  password: string;
  email: string;
  phone: string;
  photo: string;
  iD_Card: string;
  username: string;
  profileId: number;
  activate: boolean;
  status: boolean;
  confirmPassword: string;
}

interface FormProps {
  profileId: number;
  onClose: () => void; // Função para fechar o componente
}

export function Form({ profileId, onClose }: FormProps) {
  const [User, setUser] = useState<User>({
    fullName: "",
    password: "",
    email: "",
    phone: "",
    photo: "",
    iD_Card: "",
    username: "",
    profileId: profileId, 
    activate: false,
    status: false,
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (User.password !== User.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const dataToSend = {
        fullName: User.fullName,
        password: User.password,
        email: User.email,
        phone: User.phone,
        photo: User.photo,
        iD_Card: User.iD_Card,
        username: User.username,
        profileId: User.profileId,
        activate: User.activate,
        status: User.status
      };

      const response = await axios.post("https://localhost:7104/api/User", dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      alert("Usuário registrado com sucesso!");

      onClose(); // Fechar o formulário após o registro

      navigate('/Dashboard');
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      if (axios.isAxiosError(error)) {
        console.error('Resposta da API:', error.response);
        if (error.response) {
          alert("Adicione um outro email, esse já foi usado");
        } else {
          alert('Erro ao conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
        }
      } else {
        alert("Ocorreu um erro ao registrar o usuário. Por favor, tente novamente.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-regular mb-1">Nome completo:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Seu nome"
            value={User.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-regular mb-1">Endereço de email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Seu email"
            value={User.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-regular mb-1">Telemóvel:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Ex: 9xx-xxx-xxx"
            value={User.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-regular mb-1">Foto (URL):</label>
          <input
            type="text"
            id="photo"
            name="photo"
            placeholder="URL da foto"
            value={User.photo}
            className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="iD_Card" className="block text-gray-700 font-regular mb-1">Bilhete de Identidade:</label>
          <input
            type="text"
            id="iD_Card"
            name="iD_Card"
            placeholder="Seu BI"
            value={User.iD_Card}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-regular mb-1">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Seu username"
            value={User.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-regular mb-1">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={User.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-regular mb-1">Confirmação da Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirme sua password"
            value={User.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mb-4 bg-brown font-bold text-white py-2 rounded-md hover:bg-amber-900 focus:outline-none"
        >
          Submeter
        </button>
      </form>
    </>
  );
}
