import React, { useState, useContext } from 'react';
import { ThemeContext } from '../main';
import { motion } from 'framer-motion';

const TextScaleSlider = ({ min = 50, max = 200, step = 25, initialValue = 100 }) => {
  const { theme } = useContext(ThemeContext);
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${((value - min) * 100) / (max - min)}% 100%`
    };
  };

  const steps = [];
  for (let i = min; i <= max; i += step) {
    steps.push(i);
  }

  return (
    <div className={`w-full max-w-md mx-auto p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                    ${theme === 'dark' ? 'dark:bg-gray-700' : ''}
                    `}
        style={{
          ...getBackgroundSize(),
          background: `linear-gradient(to right, 
            ${theme === 'dark' ? '#3B82F6' : '#2563EB'} 0%, 
            ${theme === 'dark' ? '#3B82F6' : '#2563EB'} ${((value - min) * 100) / (max - min)}%, 
            ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} ${((value - min) * 100) / (max - min)}%, 
            ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} 100%)`
        }}
      />
      <div className="relative w-full h-6 mt-2">
        {steps.map((step) => (
          <div
            key={step}
            className={`absolute w-1 h-3 -mt-1 -translate-x-1/2 ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
            }`}
            style={{ left: `${((step - min) / (max - min)) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        {steps.map((step) => (
          <span key={step} className="px-1">
            {step}%
          </span>
        ))}
      </div>
      <motion.div
        className={`text-center mt-4 font-bold text-2xl ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
      >
        {value}%
      </motion.div>
      <div className="mt-4 text-center">
        <span 
          className={`inline-block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
          style={{ fontSize: `${value}%` }}
        >
          Sample Text
        </span>
      </div>
    </div>
  );
};

export default TextScaleSlider;
