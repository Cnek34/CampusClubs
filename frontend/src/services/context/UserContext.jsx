import { createContext, useContext, useState, useEffect } from "react";
import { check } from '@services/api/api'
import { jwtDecode } from 'jwt-decode';

const emptyUser = { id: null, fullName: '', phone: '', email: '' };

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(emptyUser);
    const [isAuth, setIsAuth] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthLoading(false);
                return;
            }

            try {
                const decoded = await check();
                setUser({
                    id: decoded.id,
                    fullName: decoded.full_name,
                    phone: decoded.phone,
                    email: decoded.email
                });
                setIsAuth(true);
            } catch {
                setIsAuth(false);
            } finally {
                setIsAuthLoading(false);
            }
        }

        initAuth();
    }, [])

    const loginUser = (email) => {
        const decoded = jwtDecode(localStorage.getItem('token'));
        setUser({
            id: decoded.id,
            fullName: decoded.full_name,
            phone: decoded.phone,
            email: email
        });
        setIsAuth(true);
    };

    const logout = () => {
        setUser(emptyUser);
        setIsAuth(false);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, isAuth, isAuthLoading, loginUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);