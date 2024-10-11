import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Image, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownButton = ({ onFileSelect }) => {
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

  const handleFileInput = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file, type);
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        onClick={handleClick} // Добавляем обработчик нажатия клавиш
      >
        <Paperclip className="h-5 w-5" />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-2 space-y-2">
              <label className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors">
                <Image className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Изображение</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileInput(e, 'image')} />
              </label>
              <label className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors">
                <File className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Документ</span>
                <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => handleFileInput(e, 'document')} />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownButton;