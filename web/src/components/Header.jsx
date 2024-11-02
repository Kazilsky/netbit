import React, { useContext } from 'react';
import { Menu, X, Moon, Sun, User, Home, MessagesSquare, Github, Settings, HandCoins } from 'lucide-react';
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
    { id: 'donate', icon: HandCoins, label: 'Задонатьте нам', href: '/', target: '_blank' },
    { id: 'github', icon: Github, label: 'Репозиторий', href: 'https://github.com/Kazilsky/netbit', target: '_blank' },
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
      className={`bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg rounded-b-3xl`}
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
                    ? 'text-white bg-blue-700 dark:bg-blue-600'
                    : 'text-gray-700 bg-gray-100 dark:bg-black dark:text-white hover:bg-white hover:bg-opacity-70 dark:hover:bg-opacity-10'
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

            
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white bg-blue-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-200"
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
                      ? 'text-blue-500 dark:blue-300 bg-blue-50 dark:bg-gray-800'
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