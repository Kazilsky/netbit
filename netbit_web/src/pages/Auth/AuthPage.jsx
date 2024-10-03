import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Features from './components/Features';
import AnimatedBackground from './components/AnimatedBackground';
import WaveEffect from './components/WaveEffect';
import AlphaBadge from './components/AlphaBadge';
import AuthForm from './components/AuthForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <motion.div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1F2937', // bg-gray-900
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <AnimatedBackground />
      <motion.div
        style={{
          width: '100%',
          maxWidth: '64rem', // max-w-5xl
          background: 'rgba(31, 41, 55, 0.7)', // bg-gray-800 с прозрачностью
          borderRadius: '1.5rem', // rounded-3xl
          overflow: 'hidden',
          position: 'relative',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WaveEffect />
        <AlphaBadge isLogin={isLogin} />
        
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <motion.div
            style={{
              width: '50%',
              padding: '2rem',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-400">
              Добро пожаловать в Нетбит
            </h2>

            <div className="flex space-x-4 mb-6">
              {[FaGoogle, FaGithub].map((Icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(59, 130, 246)" }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 transition-colors"
                >
                  <Icon size={24} />
                </motion.button>
              ))}
            </div>

            <div className="relative mb-6 w-full">
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

          <motion.div
            style={{
              width: '50%',
              padding: '2rem',
              background: '#374151', // bg-gray-700
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">
              Откройте мир Нетбит
            </h2>
            
            <Features />

            <motion.div
              className="absolute bottom-4 right-4 text-blue-400 text-sm"
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