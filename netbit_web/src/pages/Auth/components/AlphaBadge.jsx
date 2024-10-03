import React from 'react';
import { motion } from 'framer-motion';

const AlphaBadge = ({ isLogin }) => (
  <motion.div
    className="absolute top-4 right-4 z-20"
    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ 
      duration: 0.8,
      ease: "easeOut"
    }}
    key={isLogin ? "login" : "register"}
  >
    <motion.div
      className="relative px-6 py-2"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm rounded-lg border border-blue-400/30"
        animate={{
          borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(138, 43, 226, 0.3)'],
          boxShadow: [
            '0 0 10px rgba(59, 130, 246, 0.3)',
            '0 0 15px rgba(138, 43, 226, 0.3)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <span className="relative text-blue-400 font-bold tracking-widest text-lg">
        АЛЬФА
      </span>
    </motion.div>
  </motion.div>
);

export default AlphaBadge;