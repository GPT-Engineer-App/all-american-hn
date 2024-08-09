import React from 'react';
import { motion } from 'framer-motion';

const Firework = ({ delay }) => {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: [0, 4, 4],
        opacity: [1, 1, 0],
        top: ['-10%', '-50%'],
        left: ['50%', `${Math.random() * 100}%`],
      }}
      transition={{
        duration: 2,
        ease: 'easeOut',
        times: [0, 0.2, 1],
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
      }}
    />
  );
};

const Fireworks = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, index) => (
        <Firework key={index} delay={Math.random() * 2} />
      ))}
    </div>
  );
};

export default Fireworks;
