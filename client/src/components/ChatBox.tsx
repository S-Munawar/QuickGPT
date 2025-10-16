import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import type { Message } from '../types';
import { assets } from '../assets/assets';
import MessageComponent from './Message';

const ChatBox = () => {
  const {selectedChat, theme} = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, _setLoading] = useState(false);
  const [Prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('text');
  const [isPublished, setIsPublishing] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      {/* Chat Messages */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
      {messages.length === 0 && !loading && (
        <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
          <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="No messages" className='w-full max-w-56 sm:max-w-68' />
          <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>Ask me anything</p>
        </div>
      )}

      {messages.map((message, index) => (
        <MessageComponent key={index} message={message} />
      ))}

      {loading && 
      <div className='loader flex items-center gap-1.5'>
      <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
      <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
      <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
    </div>
    }

    {mode === 'image' && (
      <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
        <p>Upload to Community</p>
        <input 
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublishing(e.target.checked)}
          className='cursor-pointer'
        />
      </label>
    )}

    {/* Prompt Input Box */}
    <form className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark-border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center' onSubmit={onSubmit}>
      <label htmlFor="message-type-select" className="sr-only">Message type</label>
      <select onChange={(e) => setMode(e.target.value)} value={mode} id="message-type-select" className='text-sm pl-3 pr-2 outline-none'>
        <option className='dark:bg-purple-900' value="text">Text</option>
        <option className='dark:bg-purple-900' value="image">Image</option>
      </select>

      <label htmlFor="prompt-input" className="sr-only">Message</label>
      <input
        id="prompt-input"
        title="Message input"
        onChange={(e) => setPrompt(e.target.value)}
        value={Prompt}
        type="text"
        placeholder="Type your message..."
        className='flex-1 w-full text-sm outline-none'
      />

      <button disabled={loading} type="submit">
        <img src={loading ? assets.stop_icon : assets.send_icon} alt="Send" className='w-8 cursor-pointer' />
      </button>
    </form>
  </div>
  </div>
)
}
export default ChatBox;
