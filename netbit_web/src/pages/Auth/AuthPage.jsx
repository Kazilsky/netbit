import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaDiscord, FaGithub } from 'react-icons/fa';
import Features from './components/Features';
import AnimatedBackground from './components/AnimatedBackground';
import WaveEffect from './components/WaveEffect';
import AlphaBadge from './components/AlphaBadge';
import AuthForm from './components/AuthForm';
import { login } from '../../utils/api/api'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await login(formData);
      if (response && response.token) {
        localStorage.setItem('NetBitProgramm_419074_AccessToken', response.token);
        onLoginSuccess();
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="w-screen min-h-screen flex justify-center items-center bg-gray-900 overflow-hidden relative p-4"
    >
      <AnimatedBackground />
      <motion.div
        className="w-full max-w-5xl bg-gray-800/70 rounded-3xl overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WaveEffect />
        
        <motion.div className="flex flex-col lg:flex-row">
          <motion.div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-400 flex items-start">
            Добро пожаловать в Нетбит
            <AlphaBadge />
          </h2>

            <div className="flex space-x-4 mb-6 sm:mb-6 justify-center lg:justify-start">
              {[FaGoogle, FaDiscord, FaGithub].map((Icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(59, 130, 246)" }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 sm:p-2 rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 transition-colors"
                >
                  <Icon size={32} className="sm:text-3x1" />
                </motion.button>
              ))}
            </div>

            <div className="relative mb-4 sm:mb-6 w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">или используйте email</span>
              </div>
            </div>

            <AuthForm 
              isLogin={isLogin} 
              loading={loading} 
              onSubmit={handleSubmit} 
              onToggleMode={() => setIsLogin(!isLogin)}
            />
          </motion.div>

          <motion.div className="hidden lg:flex w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 bg-gray-700 flex-col relative">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-400 text-center">
              Откройте мир Нетбит
            </h2>
            <div className="items-center justify-center">
              <Features />
            </div>

            <motion.div
              className="absolute bottom-4 right-4 text-blue-400 text-sm hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Нетбит: Ваш новый слой интернета
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;