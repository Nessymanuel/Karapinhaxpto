import React, { useState } from 'react';
import { api } from '../../server/api';
import 'tailwindcss/tailwind.css';

interface EditProfissionalProps {
    id: number;
    initialName: string;
    initialServiceID: number;
    initialEmail: string;
    initialPhoto: string;
    initialPhone: string;
    initialIdCard: string;
    onSaveSuccess: (updatedProfissional: {
        id: number;
        name: string;
        service_ID: number;
        email: string;
        photo: string;
        phone: string;
        id_Card: string;
    }) => void;
}

export const EditProfissionalForm: React.FC<EditProfissionalProps> = ({
    id,
    initialName,
    initialServiceID,
    initialEmail,
    initialPhoto,
    initialPhone,
    initialIdCard,
    onSaveSuccess,
}) => {
    const [name, setName] = useState(initialName);
    const [serviceID, setServiceID] = useState(initialServiceID);
    const [email, setEmail] = useState(initialEmail);
    const [photo, setPhoto] = useState(initialPhoto);
    const [phone, setPhone] = useState(initialPhone);
    const [idCard, setIdCard] = useState(initialIdCard);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangeCategoryID = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceID(parseInt(e.target.value, 10));
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoto(e.target.value);
    };

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleChangeIdCard = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdCard(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const updatedProfissional = {
                id,
                name,
                service_ID: serviceID,
                email,
                photo,
                phone,
                id_Card: idCard,
            };

            await api.put(`https://localhost:7104/api/Profissional/${id}`, updatedProfissional);
            console.log('Profissional atualizado com sucesso!');
            onSaveSuccess(updatedProfissional);
        } catch (error) {
            console.error('Erro ao atualizar profissional:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={name}
                onChange={handleChangeName}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="Nome do Profissional"
                required
            />
            <input
                type="number"
                value={serviceID}
                onChange={handleChangeCategoryID}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="ID do Serviço"
                required
            />
            <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="E-mail do Profissional"
                required
            />
            <input
                type="text"
                value={photo}
                onChange={handleChangePhoto}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="URL da Foto do Profissional"
                required
            />
            <input
                type="tel"
                value={phone}
                onChange={handleChangePhone}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="Telefone do Profissional"
                required
            />
            <input
                type="text"
                value={idCard}
                onChange={handleChangeIdCard}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md focus:outline-none mb-2"
                placeholder="Número de Identidade do Profissional"
                required
            />
            <button
                type="submit"
                className="bg-brown text-white font-bold py-1 px-3 rounded-md focus:outline-none"
            >
                Salvar Alterações
            </button>
        </form>
    );
};
