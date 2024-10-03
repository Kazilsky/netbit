
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><h1>Главная страница</h1></PageWrapper>} />
        <Route path="/setting" element={<PageWrapper><SettingsList /></PageWrapper>} />
        <Route path="/dmchat" element={<PageWrapper><DMChat /></PageWrapper>} />
        <Route path="/help" element={<PageWrapper><h1>ЭПИК РУИНА РАЗБАНЬ ДОКА</h1></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const Routers = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('NetBitProgramm_419074_AccessToken');
    const refreshToken = localStorage.getItem('NetBitProgramm_419074_RefreshToken');
    if (token) {
      setIsLoggedIn(true);
    } 
  }, []);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
    {isLoggedIn ? (
      <div className="flex flex-col min-h-screen max-h-screen w-screen overflow-hidden">
        <Header isLoggedIn={true} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
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
