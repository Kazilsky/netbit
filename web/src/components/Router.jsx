import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Mails, User, Settings, Menu } from 'lucide-react';

import SettingsList from "../pages/Settings/Settings";
import DMChat from "../pages/Chat/DMChat";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AuthPage from '../pages/Auth/AuthPage';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

const BottomNavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full py-2 cursor-pointer transition-all duration-200 ease-in-out ${
      isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
    }`}
  >
    <div className="relative">
      <Icon className="h-6 w-6 mb-1" />
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-1/2 w-5 h-1 bg-blue-500 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </div>
);

const MainContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><h1>Главная страница</h1></PageWrapper>} />
        <Route path="/setting" element={<PageWrapper><SettingsList /></PageWrapper>} />
        <Route path="/dmchat" element={<PageWrapper><DMChat /></PageWrapper>} />
        <Route path="/help" element={<PageWrapper><h1>ЭПИК РУИНА РАЗБАНЬ ДОКА</h1></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

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

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen max-h-screen w-screen">
      {isLoggedIn ? (
        <>
          {!isMobile && (
            <Header isLoggedIn={true} activeTab={activeTab} setActiveTab={setActiveTab}>
              <button onClick={toggleSidebar} className="p-2">
                <Menu size={24} />
              </button>
            </Header>
          )}
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
              <Routes>
                <Route path="/" element={<PageWrapper><h1>Главная страница</h1></PageWrapper>} />
                <Route path="/setting" element={<PageWrapper><SettingsList /></PageWrapper>} />
                <Route 
                  path="/dmchat" 
                  element={
                    <PageWrapper>
                      <DMChat onContactSelect={handleContactSelect} />
                    </PageWrapper>
                  } 
                />
                <Route path="/help" element={<PageWrapper><h1>ЭПИК РУИНА РАЗБАНЬ ДОКА</h1></PageWrapper>} />
              </Routes>
            </main>
          </div>
          {isMobile && !selectedContact && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 px-4 shadow-lg"
            >
              <BottomNavItem icon={Home} label="Главная" isActive={activeTab === 'home'} onClick={() => handleNavigation('/', 'home')} />
              <BottomNavItem icon={Mails} label="Чат" isActive={activeTab === 'chat'} onClick={() => handleNavigation('/dmchat', 'chat')} />
              <BottomNavItem icon={Settings} label="Настройки" isActive={activeTab === 'settings'} onClick={() => handleNavigation('/setting', 'settings')} />
            </motion.div>
          )}
        </>
      ) : (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

const Routers = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default Routers; 