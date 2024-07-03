import React from 'react';

interface UserProfileProps {
    userData: {
        username: string;
        ID_Card: string;
        fullName: string;
        email: string;
        phone: string;
        photo: string;
    };
}

export const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-screen fixed top-0 left-0 w-full md:w-1/6">
            <img src={userData.photo} alt={userData.fullName} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-center text-xl font-semibold mb-2">{userData.fullName}</h2>
            <p className="text-center text-gray-600">{userData.email}</p>
            <p className="text-center text-gray-600">{userData.phone}</p>
        </div>
    );
};

