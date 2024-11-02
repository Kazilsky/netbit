import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const NetBitLogo = () => {
  const { theme } = useTheme()

  const isDarkTheme = theme === 'dark'

  const globeColor = isDarkTheme ? '#1d2633' : '#ffffff'
  const lineColor = isDarkTheme ? '#4a90e2' : '#2c3e50'
  const dotColor = isDarkTheme ? '#ffd700' : '#e74c3c'

  // return (
  //   <div className="flex flex-col items-center space-y-4">
  //     <motion.svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 200 200"
  //       className="w-40 h-40 md:w-60 md:h-60"
  //     >
  //       <defs>
  //         <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  //           <stop offset="0%" stopColor={globeColor} />
  //           <stop offset="100%" stopColor={isDarkTheme ? '#2c3e50' : '#f0f0f0'} />
  //         </linearGradient>
  //       </defs>

  //       {/* Globe background */}
  //       <motion.circle
  //         cx="100"
  //         cy="100"
  //         r="80"
  //         fill="url(#globeGradient)"
  //         initial={{ scale: 0 }}
  //         animate={{ scale: 1 }}
  //         transition={{ duration: 1, ease: 'easeOut' }}
  //       />

  //       {/* Rotating connection lines */}
  //       <motion.g
  //         initial={{ rotate: 0 }}
  //         animate={{ rotate: 360 }}
  //         transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
  //       >
  //         {[0, 60, 120, 180, 240, 300].map((angle) => (
  //           <motion.path
  //             key={angle}
  //             d={`M100,100 L${100 + 80 * Math.cos(angle * Math.PI / 180)},${100 + 80 * Math.sin(angle * Math.PI / 180)} A80,80 0 0,1 ${100 + 80 * Math.cos((angle + 60) * Math.PI / 180)},${100 + 80 * Math.sin((angle + 60) * Math.PI / 180)} Z`}
  //             stroke={lineColor}
  //             strokeWidth="1"
  //             fill="none"
  //             initial={{ pathLength: 0, opacity: 0 }}
  //             animate={{ pathLength: 1, opacity: 1 }}
  //             transition={{
  //               duration: 2,
  //               delay: angle / 60,
  //               repeat: Infinity,
  //               repeatType: 'loop',
  //               repeatDelay: 3,
  //             }}
  //           />
  //         ))}
  //       </motion.g>

  //       {/* Pulsating connection points */}
  //       {[45, 135, 225, 315].map((angle) => (
  //         <motion.circle
  //           key={angle}
  //           cx={100 + 70 * Math.cos(angle * Math.PI / 180)}
  //           cy={100 + 70 * Math.sin(angle * Math.PI / 180)}
  //           r="4"
  //           fill={dotColor}
  //           initial={{ scale: 0 }}
  //           animate={{ scale: [0, 1.5, 0] }}
  //           transition={{
  //             duration: 2,
  //             delay: angle / 90,
  //             repeat: Infinity,
  //             repeatType: 'loop',
  //             repeatDelay: 1,
  //           }}
  //         />
  //       ))}

  //       {/* Central NetBit icon */}
  //       <motion.path
  //         d="M85,90 L85,110 M95,85 L95,115 M105,85 L105,115 M115,90 L115,110"
  //         stroke={lineColor}
  //         strokeWidth="4"
  //         strokeLinecap="round"
  //         initial={{ pathLength: 0 }}
  //         animate={{ pathLength: 1 }}
  //         transition={{ duration: 1.5, delay: 0.5 }}
  //       />
  //     </motion.svg>
  //   </div>
  // )
  return (
    <div>
      <h1 className='text-center font-breton'>NETBIT</h1>
    </div>
  )
}

export default NetBitLogo