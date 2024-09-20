import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip } from 'lucide-react';
import DropdownFileInput from './AttachmentFileInput';

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      scaleY: 0,
      transformOrigin: "bottom"
    },
    visible: { 
      opacity: 1,
      scaleY: 1,
      transition: { 
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={toggleOpen}
        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Paperclip className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10"
            style={{ 
              width: '16rem',
              transformOrigin: 'bottom',
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}
          >
            <div className="p-4">
              <DropdownFileInput label="Прикрепить файл" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownButton;