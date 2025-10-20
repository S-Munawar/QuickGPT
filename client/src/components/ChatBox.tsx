import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import type { Message } from '../types';
import { assets } from '../assets/assets';
import MessageComponent from './Message';
import { toast } from 'react-hot-toast';

const ChatBox = () => {
  const {selectedChat, theme, user, token, axios, setUser} = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, _setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('text');
  const [isPublished, setIsPublishing] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    try{
      e.preventDefault();
      if (!user) return toast('Please login to send messages');
      _setLoading(true)
      const promptCopy = prompt;
      setPrompt('');
      setMessages(prev => [
        ...prev,
        {
          role: 'user',
          content: prompt,
          timestamp: Date.now(),
          isImage: mode === 'image',
          isPublished: isPublished
        },
      ]);

      const {data} =  await axios.post(`/api/message/${mode}`, { prompt: promptCopy, chatId: selectedChat?._id, isPublished }, { headers: { Authorization: token } });
      if (data.success) {
        setMessages(prev => [
          ...prev,
          data.reply
        ]);
        if (mode === 'image') {
          setUser(prev => {
            if (!prev) return prev;
            const currentCredits = prev.credits ?? 0;
            return { ...prev, credits: currentCredits - 2 };
          });
        } else {
          setUser(prev => {
            if (!prev) return prev;
            const currentCredits = prev.credits ?? 0;
            return { ...prev, credits: currentCredits - 1 };
          });
        }
      }
      else {
        toast.error('Failed to send message');
        setPrompt(promptCopy); // Restore prompt on failure
      }
    }
    catch(error) {
      toast.error('Failed to send message');
    } finally {
      _setLoading(false);
      setPrompt('');
    }
}

useEffect(() => {
  if (selectedChat) {
    setMessages(selectedChat.messages || []);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedChat]);


  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      {/* Chat Messages */}
      <div className='flex-1 mb-5 overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent'>
      {messages.length === 0 && !loading && (
        <div className='h-full flex flex-col items-center justify-center gap-2 text-primary animate-fade-in'>
          <img 
            src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} 
            alt="No messages" 
            className='w-full max-w-56 sm:max-w-68 opacity-90 transition-opacity duration-300 hover:opacity-100' 
          />
          <p className='mt-5 text-4xl sm:text-6xl text-center font-light bg-gradient-to-r from-gray-600 to-gray-400 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
            Ask me anything
          </p>
        </div>
      )}

      {messages.map((message, index) => (
        <MessageComponent key={index} message={message} />
      ))}

      {loading && 
        <div className='loader flex items-center gap-1.5 my-4'>
          <div className='w-2 h-2 rounded-full bg-primary dark:bg-purple-400 animate-bounce [animation-delay:0ms]'></div>
          <div className='w-2 h-2 rounded-full bg-primary dark:bg-purple-400 animate-bounce [animation-delay:150ms]'></div>
          <div className='w-2 h-2 rounded-full bg-primary dark:bg-purple-400 animate-bounce [animation-delay:300ms]'></div>
        </div>
      }
    </div>

    {/* Bottom Section with Checkbox and Input */}
    <div className='space-y-4'>
      {mode === 'image' && (
        <div className='flex justify-center'>
          <label className='inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-primary/10 dark:bg-purple-900/20 border border-primary/20 dark:border-purple-700/30 cursor-pointer transition-all duration-200 hover:bg-primary/20 dark:hover:bg-purple-900/30'>
            <span className='font-medium text-gray-700 dark:text-gray-300'>Upload to Community</span>
            <input 
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublishing(e.target.checked)}
              className='w-4 h-4 cursor-pointer accent-primary dark:accent-purple-500 transition-transform duration-200 hover:scale-110'
            />
          </label>
        </div>
      )}

      {/* Prompt Input Box */}
      <form 
        className='bg-white/80 dark:bg-[#583C79]/40 backdrop-blur-sm border-2 border-primary/30 dark:border-[#80609F]/40 rounded-2xl w-full max-w-2xl p-3 pl-5 mx-auto flex gap-4 items-center shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 dark:hover:border-[#80609F]/60' 
        onSubmit={onSubmit}
      >
        <label htmlFor="message-type-select" className="sr-only">Message type</label>
        <select 
          onChange={(e) => setMode(e.target.value)} 
          value={mode} 
          id="message-type-select" 
          className='text-sm font-medium pl-3 pr-2 py-1.5 outline-none bg-transparent text-gray-700 dark:text-gray-200 cursor-pointer transition-colors duration-200 hover:text-primary dark:hover:text-purple-400'
        >
          <option className='dark:bg-purple-900 bg-white' value="text">✨ Text</option>
          <option className='dark:bg-purple-900 bg-white' value="image">🎨 Image</option>
        </select>

        <div className='w-px h-6 bg-gray-300 dark:bg-gray-600'></div>

        <label htmlFor="prompt-input" className="sr-only">Message</label>
        <input
          id="prompt-input"
          title="Message input"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Type your message..."
          className='flex-1 w-full text-sm outline-none bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-800 dark:text-white'
          disabled={loading}
        />

        <button 
          disabled={loading} 
          type="submit"
          className='p-2 rounded-full hover:bg-primary/10 dark:hover:bg-purple-700/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group'
        >
          <img 
            src={loading ? assets.stop_icon : assets.send_icon} 
            alt="Send" 
            className='w-7 h-7 transition-transform duration-200 group-hover:scale-110 group-active:scale-95' 
          />
        </button>
      </form>
    </div>
  </div>
)
}
export default ChatBox;
