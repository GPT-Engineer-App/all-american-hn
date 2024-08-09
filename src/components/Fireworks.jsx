import React from 'react';
import { motion } from 'framer-motion';

const Firework = ({ delay, x, y }) => {
  const colors = ['#ff0000', '#ffffff', '#0000ff'];
  return (
    <motion.div
      className="absolute w-6 h-6 rounded-full"
      style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
      initial={{ scale: 0, opacity: 1, x, y }}
      animate={{
        scale: [0, 8, 8],
        opacity: [1, 1, 0],
        y: [y, y - 200],
      }}
      transition={{
        duration: 1,
        ease: 'easeOut',
        times: [0, 0.2, 1],
        delay: delay,
      }}
    />
  );
};

const StarSpangle = ({ delay, x, y }) => {
  return (
    <motion.div
      className="absolute text-2xl"
      initial={{ scale: 0, opacity: 1, x, y }}
      animate={{
        scale: [0, 1, 1],
        opacity: [1, 1, 0],
        y: [y, y - 100],
      }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
        times: [0, 0.2, 1],
        delay: delay,
      }}
    >
      ⭐
    </motion.div>
  );
};

const Fireworks = ({ trigger }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {trigger && [...Array(100)].map((_, index) => (
        <React.Fragment key={index}>
          <Firework
            delay={Math.random() * 0.3}
            x={Math.random() * window.innerWidth}
            y={window.innerHeight}
          />
          {index % 5 === 0 && (
            <StarSpangle
              delay={Math.random() * 0.3}
              x={Math.random() * window.innerWidth}
              y={window.innerHeight}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Fireworks;
