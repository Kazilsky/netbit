import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Moon, Sun, User, Home, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../main';
import AnimatedLogo from './AnimatedLogo';

const Header = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'notifications', icon: Bell, label: 'Уведомления' },
    { id: 'profile', icon: User, label: 'Профиль' },
  ];

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header 
      className={`bg-white dark:bg-gray-900 shadow-sm`}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedLogo className="h-10 w-auto" />
          </motion.div>
          
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <motion.a
                key={item.id}
                href="#"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === item.id
                    ? 'text-indigo-600 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="inline-block mr-1 h-5 w-5" />
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            {isLoggedIn ? (
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="p-1 rounded-full bg-indigo-600 text-white">
                  <User className="h-6 w-6" />
                </button>
              </motion.div>
            ) : (
              <motion.a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Войти
              </motion.a>
            )}
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <motion.a
                  key={item.id}
                  href="#"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === item.id
                      ? 'text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="inline-block mr-2 h-5 w-5" />
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {isLoggedIn ? (
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <User className="h-10 w-10 rounded-full bg-indigo-600 p-2 text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">Имя пользователя</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">username@example.com</div>
                  </div>
                </div>
              ) : (
                <div className="px-5">
                  <motion.a
                    href="#"
                    className="block text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Войти
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;