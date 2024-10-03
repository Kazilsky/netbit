
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush, FaUsers, FaPlug } from 'react-icons/fa';

const Features = () => {
  const features = [
    { 
      icon: FaUsers, 
      title: "Для всех", 
      description: "Создавайте свои истории и делитесь ими",
      disabled: false
    },
    { 
      icon: FaCode, 
      title: "Для программистов",
      description: "Веб IDE с коллаборацией и интеграцией Git",
      disabled: true
    },
    { 
      icon: FaPaintBrush, 
      title: "Для художников",
      description: "Совместное рисование и творческие активности",
      disabled: true
    },
    { 
      icon: FaPlug, 
      title: "Открытый код",
      description: "Разрабатывайте собственные плагины и расширения",
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