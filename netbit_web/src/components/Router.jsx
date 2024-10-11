
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';

import SettingsList from "../pages/Settings/Settings";
import DMChat from "../pages/Chat/DMChat";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AuthPage from '../pages/Auth/AuthPage';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 0 }}
    transition={{ duration: 0.15 }}
  >
    {children}
  </motion.div>
);

const MainContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<PageWrapper><h1>Главная страница</h1></PageWrapper>} key="home" />
        <Route path="/setting" element={<PageWrapper><SettingsList /></PageWrapper>} key="settings" />
        <Route path="/dmchat" element={<PageWrapper><DMChat /></PageWrapper>} key="dmchat" />
        <Route path="/help" element={<PageWrapper><h1>ЭПИК РУИНА РАЗБАНЬ ДОКА</h1></PageWrapper>} key="help" />
      </Routes>
    </AnimatePresence>
  );
};

const Routers = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('NetBitProgramm_419074_AccessToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('NetBitProgramm_419074_AccessToken')]);

  const handleLoginSuccess = () => {
    console.log('Пользователь успешно вошел в систему');
    setIsLoggedIn(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="flex flex-col min-h-screen max-h-screen w-screen">
          <Header isLoggedIn={true} activeTab={activeTab} setActiveTab={setActiveTab}>
            {isMobile && (
              <button onClick={toggleSidebar} className="p-2">
                <Menu size={24} />
              </button>
            )}
          </Header>
          <div className="flex flex-1 overflow-hidden">
            {!isMobile && <Sidebar />}
            {isMobile && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isSidebarOpen ? 0 : "-100%" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg"
              >
                <Sidebar />
              </motion.div>
            )}
            <main className="flex-1 overflow-auto">
              <MainContent />
            </main>
          </div>
        </div>
      ) : (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}
    </Router>
  );
};

export default Routers;
