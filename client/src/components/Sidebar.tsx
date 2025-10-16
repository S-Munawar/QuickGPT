import React  from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import moment from 'moment';

interface SidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen, toggleMenu }) => {

  const { user, chats, setSelectedChat, theme, setTheme, navigate } = useAppContext();
  const [search, setSearch] =   useState('');

  return (
    <div className={`flex flex-col top-0 left-0 bottom-0 w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#88609F]/30 backdrop-blur-3xl transform transition-transform duration-500 fixed z-40 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      
      {/* Logo */}
      <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="Logo" className='w-full max-w-48'/>

      {/* New Chat Button */}
      <button className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer' >
        <span className='mr-2 text-xl'>+</span> New Chat
      </button>

      {/* Search Conversations */}
      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md'>
        <img src={assets.search_icon} alt="Search" className='w-4 not-dark:invert' />
        <input 
          type="text" 
          placeholder='Search conversations' 
          className='text-xs placeholder:text-gray-400 outline-none'
          onChange={(e)=> setSearch(e.target.value)}
          value={search}
        />
      </div>

      {/* Recent Chats */}
      <p className='mt-4 text-sm'>Recent Chats</p>
      
        <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>

          {chats.length === 0 ? (
            
            <p className='mt-2 text-xs text-gray-400'>No recent chats</p>

          ) : (
          
            chats.filter((chat) => chat.messages[0] ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase()) : (chat.name ?? '').toLowerCase().includes(search.toLowerCase()))
            .map((chat) => (
              <div onClick={() => {navigate('/'); setSelectedChat(chat); toggleMenu()}} key={chat._id} className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group'>
                <div>
                  <p className='truncate w-full'>
                    {chat.messages.length > 0 ? chat.messages[0].content.slice(0,32) : chat.name}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                    {moment(chat.updatedAt).fromNow()}
                  </p>
                </div>
                <img src={assets.bin_icon} alt="Delete" className='hidden group-hover:block w-4 cursor-pointer not-dark:invert' />
              </div>
            ))

          )}

        </div>
      

      {/* Community Images */}

      <div onClick={() => {navigate('/community'); toggleMenu()}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
        <img src={assets.gallery_icon} alt="Community" className='w-4.5 not-dark:invert' />
        <div className="flex flex-col text-sm">
          <p className=''>Community Images</p>
        </div>
      </div>

      {/*  Credit Purchase Options */}
      <div onClick={() => {navigate('/credits'); toggleMenu()}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
        <img src={assets.diamond_icon} alt="Community" className='w-5 dark:invert' />
        <div className="flex flex-col text-sm">
          <p className=''>Credit : {user?.credits}</p>
          <p className='text-xs text-gray-400'>Purchase Credits to use QuickGPT</p>
        </div>
      </div>

      {/* Dark mode toggle */}
      <div className='flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md'>
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} alt="Theme" className='w-4 not-dark:invert'/>
          <p className=''>Dark Mode</p>
        </div>
        <label htmlFor="theme-toggle" className='relative inline-flex cursor-pointer'>
          <input 
          type="checkbox" 
          id="theme-toggle" 
          className="sr-only peer" 
          checked={theme === 'dark'} 
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
          title="Toggle dark mode"
          />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all">
          </div>
          <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
        </label>
      </div>

      {/* User Account */}

      <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group'>
        <img src={assets.user_icon} alt="User" className='w-7 rounded-full' />
        <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : "Login"}</p>
        {user && <img src={assets.logout_icon} alt="logout" className='h-5 cursor-pointer hidden not-dark:invert group-hover:block' />}
      </div>

      <img 
      src={assets.close_icon} 
      alt="close" 
      className='absolute top-3 right-3 w-5 h-5 cursor-pointer not-dark:invert'
      onClick={toggleMenu}
      />

    </div>
  )
}

export default Sidebar
