export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  credits?: number;
}

export interface Message {
  isImage: boolean;
  isPublished?: boolean;
  role: 'user' | 'assistant' | string;
  content: string; // can be text or image path
  timestamp: number;
  imageUrl?: string; // optional, when message contains an image reference
}

export interface Chat {
  _id: string | number;
  userId: string;
  userName?: string;
  name?: string;
  messages: Message[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  chats: Chat[] | [];
  setChats: React.Dispatch<React.SetStateAction<Chat[] | []>>;
  selectedChat: Chat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  navigate: (path: string) => void;
}

export type PublishedImage = {
    imageUrl: string;
    userName: string;
};