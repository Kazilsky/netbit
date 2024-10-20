import React, { createContext, useState, useContext } from 'react';
import { Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

import Bar from "../StatusBar_Setting/Bar";
import { ThemeContext } from '../../main';
import StatusSelector from './StatusSelector';

const DiscordStyleProfile = () => {
  const [user, setUser] = useState({
    displayName: 'Kazilsky',
    'Имя пользователя': '_kazilsky',
    'usercode': '_kazilsky',
    discriminator: '1234',
    'Эл. почта': '************@bk.ru',
    'Номер телефона': '********8620'
  });

  const fields = ['Имя пользователя', 'Эл. почта', 'Номер телефона'];

  const [status, setStatus] = useState('online');
  const { theme } = useContext(ThemeContext);

  return (
    <motion.div 
  initial={{ opacity: 0, y: 0 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className={`
    ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}
    p-6 rounded-lg mx-auto transition-colors duration-300 ease-in-out
  `}
>
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Мой аккаунт</h1>
  </div>
  
  <div className="flex items-center mb-6">
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
    >
      <Bar 
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        status={status}
      />
    </motion.div>
    <div className="ml-4">
      <h2 className="text-xl font-semibold">{user.displayName}</h2>
      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {user.usercode}#{user.discriminator}
      </p>
      <StatusSelector status={status} setStatus={setStatus} theme={theme} />
    </div>
  </div>

  <div className="space-y-4">
    {fields.map((field) => (
      <div key={field} className="flex justify-between items-center">
        <span>{field}</span>
        <div className="flex items-center">
          <span className="mr-2">
            {user[field] || 'Нет данных'}
          </span>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className={`
              ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}
              p-2 rounded transition-colors duration-200 ease-in-out
            `}
          >
            <Edit2 size={16} />
          </motion.button>
        </div>
      </div>
    ))}
  </div>

  <h2 className="text-xl font-semibold mt-8 mb-4">Пароль и аутентификация</h2>
  <div className="space-y-4">
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}
        px-4 py-2 rounded transition-colors duration-200 ease-in-out
      `}
    >
      Сменить пароль
    </motion.button>
    {/* <div className="flex justify-between items-center">
      <span>Two-factor Authentication</span>
      <motion.button 
        whileHover={!isStatusMenuOpen ? { scale: 1.05 } : {}}
        whileTap={!isStatusMenuOpen ? { scale: 0.95 } : {}}
        className={`
          ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}
          px-4 py-2 rounded transition-colors duration-200 ease-in-out
        `}
      >
        Enable
      </motion.button>
    </div> */}
  </div>
  <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${theme === 'dark' ? 'bg-red-700 hover:bg-red-600' : 'bg-red-400 hover:bg-red-500'}
        mt-12 px-4 py-2 rounded transition-colors duration-200 ease-in-out
      `}
    >
      Выйти из аккаунта
    </motion.button>
</motion.div>
  );
};

export default DiscordStyleProfile;
