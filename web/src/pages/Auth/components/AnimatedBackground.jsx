import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation, useSpring } from 'framer-motion';

const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);
  const [geometricShapes, setGeometricShapes] = useState([]);
  const parallaxControls = useAnimation();

  const smoothMouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    smoothMouseX.set(moveX);
    smoothMouseY.set(moveY);
  }, [smoothMouseX, smoothMouseY]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }));
    };

    const generateShapes = () => {
      const minSize = 125; // минимальный размер фигуры
      const maxSize = 250; // максимальный размер фигуры
      const ratio = 0.75; // например, 60% от максимального размера
    
      return Array.from({ length: 50 }, (_, i) => {
        const size = Math.random() < ratio ? minSize : maxSize;
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.2 + 0.1,
          type: Math.random() > 0.5 ? 'circle' : 'square',
        };
      });
    };

    setParticles(generateParticles());
    setGeometricShapes(generateShapes());

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const updateParallax = () => {
      parallaxControls.start({ x: smoothMouseX.get(), y: smoothMouseY.get() });
      requestAnimationFrame(updateParallax);
    };
    updateParallax();
  }, [parallaxControls, smoothMouseX, smoothMouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gray-900"
        animate={{
          background: [
            'radial-gradient(circle at 30% 20%, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%)',
            'radial-gradient(circle at 70% 80%, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%)',
            'radial-gradient(circle at 30% 20%, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div className="relative w-full h-full" animate={parallaxControls} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
        {/* Geometric Shapes */}
        {geometricShapes.map((shape) => (
          <motion.div
            key={`shape-${shape.id}`}
            className={`absolute ${shape.type === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
            style={{
              width: shape.size,
              height: shape.size,
              background: `linear-gradient(45deg, rgba(255,255,255,${shape.opacity}) 0%, rgba(255,255,255,${shape.opacity * 1.5}) 100%)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360], // Полный оборот
              opacity: [shape.opacity, shape.opacity * 1.5, shape.opacity],
              x: [0, Math.random() * 100 - 50, 0], // Увеличенный диапазон движения
              y: [0, Math.random() * 100 - 50, 0], // Увеличенный диапазон движения
              left: [
                `${shape.x}%`,
                `${(shape.x + Math.random() * 20 - 10 + 100) % 100}%`,
                `${shape.x}%`
              ],
              top: [
                `${shape.y}%`,
                `${(shape.y + Math.random() * 20 - 10 + 100) % 100}%`,
                `${shape.y}%`
              ],
            }}
            transition={{
              duration: 30 + shape.id,
              rotate: { duration: 10 + shape.id * 0.5 }, // Ускоренное вращение
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Particles */}
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              x: ['-20%', '20%', '-20%'],
              y: ['-20%', '20%', '-20%'],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80" />
    </div>
  );
};

export default AnimatedBackground;