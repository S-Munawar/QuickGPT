import {createContext, useContext, useEffect, useState} from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyChats, dummyUserData } from '../assets/assets';
import { type Chat, type User, type AppContextType } from '../types/index.d';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL=import.meta.env.VITE_SERVER_URL;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'dark');
    const [token, setToken] = useState<string | null>(localStorage.getItem('token')); // Assuming token is stored in localStorage
    const [loadingUser, setLoadingUser] = useState<boolean>(true);
    
    // Function to fetch user data from server using the token
    const fetchUser = async () => {
        try{
            const {data} = await axios.get('api/user/data', { headers: { Authorization: token } });
            if (data.success) setUser(data.user);
            else toast.error('Failed to fetch user data',  data.message);
        }
        catch (error) {
            toast.error(`Failed to fetch user data: ${String(error)}`);
        }
        finally {
            setLoadingUser(false);
        }
    };

    // Placeholder function to create a new chat
    const createNewChat = async () => {
        try{
            if (!user) {
                toast.error('User not logged in');
                navigate('/');
                return;
            }
            // Use the axios default baseURL (VITE_SERVER_URL) so calls are consistent
            await axios.get('/api/chat/create', {
                headers: { Authorization: token }
            });
            await fetchUsersChats();
        }
        catch (error) {
            toast.error(`Error creating new chat: ${String(error)}`);
        }

    };

    // Function to fetch user's chats from server
    const fetchUsersChats = async () => {
        try {
            const { data } = await axios.get('/api/chat/gets', {
            headers: { Authorization: token },
            });

            if (!data.success) { // False when error occurs
            toast.error('Failed to fetch chats');
            return;
            }

            if (data.chats.length === 0) {
            await createNewChat();
            } else {
            setChats(data.chats);
            setSelectedChat(data.chats[0] || null);
            }
        } catch (error) {
            toast.error(`Error fetching chats: ${String(error)}`);
        }
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
        if (token) fetchUser();
        else {
            setUser(null);
            setLoadingUser(false);
        }
    }, [token]);

    const value: AppContextType = {
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme,
        navigate, 
        token,
        setToken,
        loadingUser,
        createNewChat,
        fetchUsersChats,
        axios,
        fetchUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return ctx;
};

