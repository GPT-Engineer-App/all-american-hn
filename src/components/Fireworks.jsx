import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Firework = ({ x, y }) => {
  const colors = ['#ff0000', '#ffffff', '#0000ff'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ scale: 0, opacity: 1, x, y }}
      animate={{
        scale: [0, 4, 4],
        opacity: [1, 1, 0],
        y: y - Math.random() * 200,
      }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    />
  );
};

const Fireworks = () => {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFireworks(prev => [
        ...prev,
        { id: Date.now(), x: Math.random() * window.innerWidth, y: window.innerHeight }
      ]);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setTimeout(() => setFireworks([]), 700); // Clear fireworks after last one fades
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {fireworks.map(fw => (
        <Firework key={fw.id} x={fw.x} y={fw.y} />
      ))}
    </div>
  );
};

export default Fireworks;
