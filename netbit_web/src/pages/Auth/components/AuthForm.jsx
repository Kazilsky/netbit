import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import  { login } from '../../../utils/api/api';

const AuthForm = ({ isLogin, loading, onSubmit, onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const Auth = () => {
    const credentials = {
      email: formData.email,
      password: formData.password,
    };
    login(credentials)
    console.log(credentials);
  }

  const formVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const buttonVariants = {
    idle: {
      scale: 1,
      backgroundColor: "rgb(37, 99, 235)",
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgb(29, 78, 216)",
      boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)",
    },
    tap: {
      scale: 0.95,
      backgroundColor: "rgb(30, 64, 175)",
    },
    loading: {
      backgroundColor: "rgb(37, 99, 235)",
    },
  };

  const switchTextVariants = {
    initial: {
      y: 10,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -10,
      opacity: 0,
    },
  };

  const LoadingAnimation = () => (
    <div className="relative w-24 h-6 flex justify-center items-center">
      <motion.div
        className="flex space-x-1"
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              y: ["0%", "-100%", "0%"],
              opacity: [1, 0.5, 1],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      <motion.div 
        className="absolute inset-0 rounded-lg border-2 border-white/30"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.form
          key={isLogin ? "login" : "register"}
          variants={formVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onSubmit={onSubmit}
          className="space-y-4"
        >
          {!isLogin && (
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <input
                type="text"
                name="nickname"
                placeholder="Никнейм"
                value={formData.nickname}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"
              />
            </motion.div>
          )}

          <motion.div variants={inputVariants}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"
            />
          </motion.div>

          {!isLogin && (
            <motion.div variants={inputVariants}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"
              />
            </motion.div>
          )}

          {isLogin && (
            <motion.div variants={inputVariants} className="text-right">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Забыли пароль?</a>
            </motion.div>
          )}
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={Auth}
            animate={loading ? "loading" : "idle"}
            className={`
              relative w-full py-3 px-4 
              bg-blue-600 hover:bg-blue-700 
              text-white font-medium 
              rounded-lg 
              transition-colors duration-200
              disabled:opacity-70 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
              overflow-hidden
            `}
            type="submit"
            disabled={loading}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-center items-center"
                >
                  <LoadingAnimation />
                </motion.div>
              ) : (
                <motion.span
                  key={isLogin ? "login" : "register"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {isLogin ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </AnimatePresence>

      <motion.div
        layout
        className="mt-6 text-center text-gray-400"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isLogin ? "login-text" : "register-text"}
            variants={switchTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          </motion.span>
        </AnimatePresence>
        <motion.button
          onClick={onToggleMode}
          className="text-white ml-2 hover:text-blue-300 transition-colors relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isLogin ? "register-btn" : "login-btn"}
              variants={switchTextVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </>
  );
};

export default AuthForm;
