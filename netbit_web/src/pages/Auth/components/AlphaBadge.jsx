
import React from 'react';
import { motion } from 'framer-motion';

const AlphaBadge = () => {
  return (
    <motion.div
      className="inline-flex ml-4 mt-0.5 items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative inline-block"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-md shadow-md overflow-hidden px-3 py-1 text-sm"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.5)",
              "0 0 0 10px rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <motion.span
            animate={{ 
              color: ["#ffffff", "#a5f3fc", "#ffffff"]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            АЛЬФА
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AlphaBadge;