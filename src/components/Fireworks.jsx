import React from 'react';
import { motion } from 'framer-motion';

const Firework = ({ delay, x, y }) => {
  const colors = ['#ff0000', '#ffffff', '#0000ff', '#ffff00'];
  return (
    <motion.div
      className="absolute w-4 h-4 rounded-full"
      style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
      initial={{ scale: 0, opacity: 1, x, y }}
      animate={{
        scale: [0, 5, 5],
        opacity: [1, 1, 0],
        y: [y, y - 100],
      }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
        times: [0, 0.2, 1],
        delay: delay,
      }}
    />
  );
};

const Fireworks = ({ trigger }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {trigger && [...Array(50)].map((_, index) => (
        <Firework
          key={index}
          delay={Math.random() * 0.5}
          x={Math.random() * window.innerWidth}
          y={window.innerHeight}
        />
      ))}
    </div>
  );
};

export default Fireworks;
