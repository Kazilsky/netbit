
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ThemeContext } from '../../main';

import Bar from '../../components/StatusBar_Setting/Bar';
import ThemeToggle from '../../components/ThemeToggle';
import DiscordStyleProfile from '../../components/Profile_Setting/DiscordProfile_test';
import TextRangeSlider from '../../components/Slider';
import { Slider } from '@material-tailwind/react';

const SettingsOption = ({ icon, label, active, onClick }) => (
  <div
    className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-200 ${active
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

  return (
    <div className={`flex w-screen h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-72 h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 shadow-xl`}>
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Настройки
        </h1>
        <div className="space-y-2">
          <SettingsOption
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
            label="Мой аккаунт"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
          <SettingsOption
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" /></svg>}
            label="Внешний вид"
            active={activeTab === 'appearance'}
            onClick={() => setActiveTab('appearance')}
          />
          <SettingsOption
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7.75 2.75a.75.75 0 0 0-1.5 0v1.258a32.987 32.987 0 0 0-3.599.278.75.75 0 1 0 .198 1.487A31.545 31.545 0 0 1 8.7 5.545 19.381 19.381 0 0 1 7 9.56a19.418 19.418 0 0 1-1.002-2.05.75.75 0 0 0-1.384.577 20.935 20.935 0 0 0 1.492 2.91 19.613 19.613 0 0 1-3.828 4.154.75.75 0 1 0 .945 1.164A21.116 21.116 0 0 0 7 12.331c.095.132.192.262.29.391a.75.75 0 0 0 1.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 0 0 2.333-5.332c.31.031.618.068.924.108a.75.75 0 0 0 .198-1.487 32.832 32.832 0 0 0-3.599-.278V2.75Z" /><path fill-rule="evenodd" d="M13 8a.75.75 0 0 1 .671.415l4.25 8.5a.75.75 0 1 1-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 1 1-1.342-.67l4.25-8.5A.75.75 0 0 1 13 8Zm2.037 6.5L13 10.427 10.964 14.5h4.073Z" clip-rule="evenodd" /></svg>}
            label="Язык"
            active={activeTab === 'language'}
            onClick={() => setActiveTab('language')}
          />
          <SettingsOption
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>}
            label="Расширенные"
            active={activeTab === 'advanced'}
            onClick={() => setActiveTab('advanced')}
          />
          <SettingsOption
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>}
            label="Обновления"
            active={activeTab === 'updates'}
            onClick={() => setActiveTab('updates')}
          />
        </div>
      </div>
      <div className="flex-grow p-8 flex flex-col">
        <div className={`p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg h-full rounded-lg`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
