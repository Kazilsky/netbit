
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SettingsList from "../pages/Settings/Settings";
import DMChat from "../pages/Chat/DMChat";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { AnimatePresence, motion } from 'framer-motion';

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
        <Route path="/help" element={<PageWrapper><h1>ЭПИК РУИНА БЛ</h1></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const Routers = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Router>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <Header isLoggedIn={true} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <MainContent />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Routers;
