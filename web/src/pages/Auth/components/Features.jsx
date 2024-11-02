
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush, FaUsers, FaPlug } from 'react-icons/fa';

const Features = () => {
  const features = [
    { 
      icon: FaUsers, 
      title: "Для всех", 
      description: (
        <div>Общайтесь без границ с <span className="underline text-white font-medium decoration-sky-500">конфиденциальностью</span></div>
      ),
      disabled: false
    },
    { 
      icon: FaPaintBrush, 
      title: "Для дизайнеров",
      description: (
        <div>Совместное рисование и <span className="underline text-white font-medium decoration-sky-500">творческие активности</span></div>
      ),
      disabled: true
    },
    { 
      icon: FaCode, 
      title: "Для программистов",
      description: (
        <div>Веб IDE с коллаборацией и <span className="underline text-white font-medium decoration-sky-500">интеграцией Git</span></div>
      ),
      disabled: true
    },
    { 
      icon: FaPlug, 
      title: "С открытым кодом",
      description: (
        <div>Разрабатывайте <span className="underline text-white font-medium decoration-sky-500">собственные плагины</span></div>
      ),
      disabled: true
    },
  ];
  

  return (
    <div className="space-y-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className={`flex items-start space-x-3 ${feature.disabled ? 'opacity-50' : ''}`}
        >
          <feature.icon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className={`font-semibold text-white ${feature.disabled ? 'line-through' : ''}`}>
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Features;