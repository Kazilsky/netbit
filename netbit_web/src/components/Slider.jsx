import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../main';
import { motion } from 'framer-motion';

const TextScaleSlider = ({ min = 50, max = 200, step = 25, initialValue = 100 }) => {
  const { theme } = useContext(ThemeContext);

  const DownloadValue = localStorage.getItem('NetBitProgramm_448673_Size');

  DownloadValue ? initialValue = DownloadValue : null

  const [value, setValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue); // Временное значение для ползунка
  const [displayValue, setDisplayValue] = useState(initialValue); // Значение для отображения
  const [rootFontSize, setRootFontSize] = useState(0); // Начальный размер шрифта

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [tempValue]);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setRootFontSize(newValue)
    setTempValue(newValue); // Обновляем временное значение при изменении ползунка
  };

  const handleChangeAfter = () => {
    setValue(tempValue); // Обновляем окончательное значение
    setDisplayValue(tempValue); // Обновляем отображаемое значение
    updateRootFontSize(tempValue); // Обновляем размер шрифта
    localStorage.setItem('NetBitProgramm_448673_Size', String(tempValue)); // Сохраняем как строку
  };

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${((tempValue - min) * 100) / (max - min)}% 100%`
    };
  };

  const steps = [];
  for (let i = min; i <= max; i += step) {
    steps.push(i);
  }

  const updateRootFontSize = (newValue) => {
    const newFontSize = (16 * newValue) / 100; // Расчет нового размера шрифта в пикселях
    setRootFontSize(newFontSize);
    document.documentElement.style.fontSize = `${newFontSize}px`; // Обновляем размер шрифта в корневом элементе
  };

  useEffect(() => {
    updateRootFontSize(value); // Обновление размера шрифта при первом рендере
  }, [value]);

  return (
    <div className={`w-full max-w-md p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={tempValue}
        onChange={handleChange}
        onTouchEnd={handleChangeAfter}
        onMouseUp={handleChangeAfter} // Обработка события отпускания ползунка на десктопе
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                    ${theme === 'dark' ? 'dark:bg-gray-700' : ''}
                    `}
        style={{
          ...getBackgroundSize(),
          background: `linear-gradient(to right, 
            ${theme === 'dark' ? '#3B82F6' : '#2563EB'} 0%, 
            ${theme === 'dark' ? '#3B82F6' : '#2563EB'} ${((tempValue - min) * 100) / (max - min)}%, 
            ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} ${((tempValue - min) * 100) / (max - min)}%, 
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
        {displayValue}%
      </motion.div>
      {tempValue !== displayValue && (
      <motion.div
      className="mt-2 text-center"
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -10,
        scale: isVisible ? 1 : 0.9,
        fontSize: `${tempValue}%`, // Убедитесь, что размер шрифта также анимируется
      }}
      transition={{ duration: 0.3 }}
    >
      <span
        className={`inline-block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
      >
        Пример текста
      </span>
    </motion.div>
    )}
    </div>
  );
};

export default TextScaleSlider;
