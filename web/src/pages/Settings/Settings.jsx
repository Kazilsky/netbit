import React, { useState, useEffect, useContext } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ThemeContext } from '../../main';
import { motion, useAnimation } from 'framer-motion';

import Bar from '../../components/StatusBar_Setting/Bar';
import ThemeToggle from '../../components/ThemeToggle';
import DiscordStyleProfile from '../../components/Profile_Setting/DiscordProfile_test';
import TextRangeSlider from '../../components/Slider';
import { Slider } from '@material-tailwind/react';

const SettingsOption = ({ icon, label, active, onClick }) => (
  <div
    className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3 text-sm font-medium">{label}</span>
  </div>
);

const statusOptions = [
  { id: 'online', name: 'В сети' },
  { id: 'busy', name: 'Занят' },
  { id: 'do_not_disturb', name: 'Не беспокоить' },
  { id: 'away', name: 'Отошел' },
];

const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">{value.name}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div
        className={`absolute mt-1 w-full rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95 pointer-events-none'
          }`}
      >
        {options.map((option) => (
          <div
            key={option.id}
            className={`${option.id === value.id ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-gray-100'
              } cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-indigo-500 hover:text-white transition-colors duration-200 ease-in-out`}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
            <span className={`block truncate ${option.id === value.id ? 'font-medium' : 'font-normal'}`}>
              {option.name}
            </span>
            {option.id === value.id && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const avatarSrc = "https://docs.material-tailwind.com/img/face-2.jpg";
  const [userStatus, setUserStatus] = useState(statusOptions[0]);

  return (
    <DiscordStyleProfile />
  );
};

const AppearanceSettings = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white mb-4">
        Внешний вид
      </h2>
      <div className="flex flex-col items-start justify-start">
        <TextRangeSlider />
      </div>
        
    </div>
  );
};

const UpdatesSettings = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Обновления
    </h2>
    {/* Добавьте настройки уведомлений здесь */}
      <h2 className="text-xl text-center text-gray-900 dark:text-white mb-4">
        Здесь что-нибудь об обновлениях будет в будущем, окей?
      </h2>
  </div>
);

const LanguageSettings = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Язык
    </h2>
    {/* Добавьте настройки языка здесь */}
    <h2 className="text-xl text-center text-gray-900 dark:text-white mb-4">
        Переводы на другие языки будут на релизе NetBit.
      </h2>
  </div>
);

const AdvancedSettings = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Расширенные
    </h2>
    {/* Добавьте расширенные настройки здесь */}
      <h2 className="text-xl text-center font text-gray-900 dark:text-white mb-4">
        Будет API, будет и режим разработчика.
      </h2>
  </div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { theme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const controls = useAnimation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'updates':
        return <UpdatesSettings />;
      case 'language':
        return <LanguageSettings />;
      case 'advanced':
        return <AdvancedSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 50 && !isMenuOpen) {
      setIsMenuOpen(true);
      controls.start({ x: 256 });
    } else if (info.offset.x < -50 && isMenuOpen) {
      setIsMenuOpen(false);
      controls.start({ x: 0 });
    } else {
      controls.start({ x: isMenuOpen ? 256 : 0 });
    }
  };

  return (
    <motion.div className={`flex h-full overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <motion.div
        initial={{ x: -256 }}
        animate={{ x: isMenuOpen ? 0 : -256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-10"
      >
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
            Настройки
          </h1>
          <SettingsOption
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
            label="Мой аккаунт"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
          {/* ... (остальные опции меню) */}
        </div>
      </motion.div>

      <motion.div 
        className="flex-grow p-4 md:p-8 overflow-y-auto"
        animate={controls}
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: 0, right: 256 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className={`p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg`}>
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;