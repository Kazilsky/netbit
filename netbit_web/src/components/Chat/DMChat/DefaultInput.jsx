import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingDots = () => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((dot) => (
      <motion.div
        key={dot}
        className="w-2 h-2 bg-white rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: dot * 0.2,
        }}
      />
    ))}
  </div>
);

const Notification = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg"
  >
    {message}
  </motion.div>
);

export default function DefaultInput() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
        Добавьте друга
      </label>
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            width: isLoading ? '0%' : '100%',
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="relative flex items-center"
          style={{ width: '100%' }}
        >
          <AnimatePresence>
            {!isLoading && (
              <motion.input
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                type='text'
                placeholder='Ник#1234'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='w-full bg-white dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 py-3 pl-4 pr-16 text-gray-700 dark:text-gray-300 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 shadow-sm'
              />
            )}
          </AnimatePresence>
        </motion.div>
        <motion.button
          className="absolute right-0 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 border rounded-full inline-flex items-center justify-center p-3 text-white shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isLoading ? {
            x: "-200%", // Движение к центру
            transition: { duration: 1, ease: "easeInOut" }
          } : {
            x: "0%", // Возвращение к исходной позиции
            transition: { duration: 1, ease: "easeInOut" }
          }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {!isLoading ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          ) : (
            <LoadingDots />
          )}
        </motion.button>
      </div>
      <AnimatePresence>
        {showNotification && (
          <Notification message="Человек не найден" />
        )}
      </AnimatePresence>
    </div>
  );
}