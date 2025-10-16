
import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'

const App = () => {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <>
    {!isMenuOpen && <img 
      src={assets.menu_icon} 
      alt="menu" 
      className='absolute top-3 left-3 w-5 h-5 not-dark:invert z-10 cursor-pointer' 
      onClick={() => setIsMenuOpen(true)}/>
    }

      <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
  <div className='flex min-h-screen w-full'>
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

          {/* Main content: shift right when sidebar is visible on larger screens */}
          <div className={`flex-1 transition-all duration-300 ${isMenuOpen ? 'ml-72' : 'ml-0'}`}>
            <Routes>
              <Route path='/' element={<ChatBox />} />
              <Route path='/credits' element={<Credits />} />
              <Route path='/community' element={<Community />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App






















