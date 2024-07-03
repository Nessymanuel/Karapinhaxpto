import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    photo: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (userData: any) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('userData');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
