import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import 'tailwindcss/tailwind.css';
import { useNavigate } from "react-router-dom";
import { api } from "../../server/api";

export function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if (response.data.success) {
                setAlertMessage("Utilizador autenticado com sucesso.");
                
                navigate('/Dashboard');
            } else {
                setAlertMessage("Credenciais inválidas. Crie uma conta para acessar.");
            }
        } catch (error) {
            console.error("Erro ao autenticar usuário:", error);
            if (axios.isAxiosError(error)) {
                console.error('Resposta da API:', error.response);
                if (error.response) {
                    setAlertMessage("Credenciais inválidas. Crie uma conta para acessar.");
                } else {
                    setAlertMessage('Erro ao conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
                }
            } else {
                setAlertMessage("Ocorreu um erro ao autenticar o usuário. Por favor, tente novamente.");
            }
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen bg-bege">
                <div className="mb-4">
                    <h1 className="text-4xl font-bold text-brown">Karapinha xpto</h1>
                </div>
                <div className="bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-regular mb-4">Entrar no Karapinha</h2>
                    {alertMessage && <p className="text-red-500">{alertMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-regular mb-2">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Seu Email" 
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-regular mb-2">Palavra passe:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Sua Palavra Passe" 
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-[#cccccc] rounded-md focus:outline-none" 
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full mb-4 bg-brown font-bold text-white py-2 rounded-md hover:bg-amber-900 focus:outline-none"
                        >
                            Entrar
                        </button>
                    </form>
                    <div className="flex gap-1">
                        <p>Não tem uma conta?</p>
                        <a className="flex justify-center text-amber-700" href="SignUp">Cadastre-se</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
