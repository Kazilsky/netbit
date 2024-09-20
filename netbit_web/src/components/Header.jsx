import React, { useContext } from 'react';
import { Menu, X, Moon, Sun, User, Home, MessagesSquare, Github, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../main';
import AnimatedLogo from './AnimatedLogo';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn, activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.includes('dmchat')) setActiveTab('notifications');
    else if (path.includes('setting')) setActiveTab('profile');
    else if (path.includes('help')) setActiveTab('github');
  }, [location, setActiveTab]);

  const menuItems = [
    // { id: 'home', icon: Home, label: 'Главная', href: '/' },
    { id: 'notifications', icon: MessagesSquare, label: 'Общаться', href: '/dmchat' },
    { id: 'profile', icon: Settings, label: 'Настройки', href: '/setting' },
    { id: 'github', icon: Github, label: 'Помощь', href: 'https://github.com/Kazilsky/netbit', target: '_blank' },
  ];

  const handleNavigation = (item) => {
    if (item.href.startsWith('http') && item.href.startsWith('https')) {
      window.open(item.href, '_blank');
    } else {
      setActiveTab(item.id);
      navigate(item.href);
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header 
      className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-b-lg`}
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
            <AnimatedLogo />
          </motion.div>
          
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out ${
                  activeTab === item.id
                    ? 'text-white bg-indigo-600 dark:bg-blue-800'
                    : 'text-gray-100 dark:text-gray-300 hover:bg-white hover:bg-opacity-20 dark:hover:bg-opacity-10'
                }`}
                onClick={() => handleNavigation(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="inline-block mr-2 h-5 w-5" />
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-transform transform ${
                theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'
              } hover:scale-110`}
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
                <button className="p-2 rounded-full bg-indigo-600 text-white shadow-lg">
                  <User className="h-6 w-6" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-transform transform hover:scale-105"
                whileTap={{ scale: 0.95 }}
              >
                Войти
              </motion.button>
            )}
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
            className="md:hidden bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`block w-full text-left px-4 py-2 rounded-md text-base font-medium ${
                    activeTab === item.id
                      ? 'text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    handleNavigation(item);
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="inline-block mr-2 h-5 w-5" />
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;