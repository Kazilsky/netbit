import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const statusOptions = [
  { id: 'online', name: 'Online', color: 'bg-green-500' },
  { id: 'idle', name: 'Idle', color: 'bg-yellow-500' },
  { id: 'do_not_disturb', name: 'Do Not Disturb', color: 'bg-red-500' },
  { id: 'away', name: 'Away', color: 'bg-gray-500' },
];

const StatusSelector = ({ status, setStatus, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentStatus = statusOptions.find(option => option.id === status);

  return (
    <div className="relative">
      <motion.button
        whileHover={{scale: 1.05}}
        whileTap={{ scale: 0.90 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md z-2 ${
          theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <span className={`w-3 h-3 rounded-full ${currentStatus.color}`}></span>
        <span>{currentStatus.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 w-48 rounded-md shadow-lg ${
              theme === 'dark' ? '#151c26' : 'bg-white'
            }`}
          >
            <div className="py-1 z-50">
              {statusOptions.map((option) => (
                <motion.button
                  key={option.id}
                  style={{zIndex: 50, backgroundColor: theme === 'dark' ? '#1b2430' : 'white'}}
                  whileHover={{ backgroundColor: theme === 'dark' ? '#151c26' : 'white' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setStatus(option.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-2 w-full px-4 py-2 text-sm ${
                    theme === 'dark' ? 'text-gray-300 bg-white' : 'text-gray-700 bg-black'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${option.color}`}></span>
                  <span>{option.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusSelector;