import {createContext, useContext, useEffect, useState} from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyChats, dummyUserData } from '../assets/assets';
import { type Chat, type User, type AppContextType } from '../types/index.d';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'dark');

    const fetchUser = async () => {
        setUser(null);
    };

    const fetchUsersChats = async () => {
            setChats(dummyChats);
            setSelectedChat(dummyChats[0] ?? null);
        };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        if (user) fetchUsersChats();
        else {
            setChats([]);
            setSelectedChat(null);
        }
    }, [user]);

    useEffect(() => {
        fetchUser();
    }, []);

    const value: AppContextType = {
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme,
        navigate
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
    return ctx;
};

