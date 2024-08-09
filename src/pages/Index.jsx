import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Flag, Star, Zap, Sparkles, Rocket, Twitter } from 'lucide-react';
import { TwitterShareButton } from 'react-share';
import { motion, AnimatePresence } from 'framer-motion';
import Fireworks from '../components/Fireworks';
import Confetti from 'react-confetti';

const fetchHNStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['hnStories'],
    queryFn: fetchHNStories,
  });

  const filteredStories = data?.hits.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (error) return <div className="text-center text-red-500">An error occurred: {error.message}</div>;

  const [showFireworks, setShowFireworks] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 5000);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-red-500 via-white to-blue-500 animate-gradient-x bg-[length:400%_400%] text-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22%3E%3Ccircle cx=%2240%22 cy=%2240%22 r=%221%22 fill=%22%23fff%22 opacity=%220.5%22%2F%3E%3C%2Fsvg%3E')] animate-twinkle"></div>
      <Fireworks trigger={showFireworks} />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <header className="mb-8 text-center">
        <motion.h1 
          className="text-6xl font-extrabold mb-4 text-red-700 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], rotateZ: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flag className="mr-2 text-blue-700" size={48} />
          🇺🇸 Top 100 All-American Freedom Tech Stories 🇺🇸
          <Flag className="ml-2 text-blue-700" size={48} />
        </motion.h1>
        <motion.p 
          className="text-2xl text-blue-700 font-bold"
          animate={{ opacity: [0.5, 1, 0.5], y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Celebrating American Innovation, Liberty, and Technological Supremacy!
        </motion.p>
      </header>
      <motion.div 
        className="mb-6 relative max-w-md mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Input
          type="text"
          placeholder="Search for ultra-patriotic, freedom-loving stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white text-blue-900 placeholder-blue-400 border-4 border-red-500 pl-12 pr-12 py-3 text-lg font-bold rounded-full shadow-lg"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
        >
          <Star className="text-red-500" size={24} />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        >
          <Zap className="text-blue-500" size={24} />
        </motion.div>
      </motion.div>
      <div className="mb-6 text-center space-x-4">
        <Button
          onClick={triggerFireworks}
          className="bg-gradient-to-r from-red-500 via-white to-blue-500 text-blue-900 hover:from-red-600 hover:to-blue-600 hover:text-white border-4 border-blue-500 transition-all duration-300 text-lg font-bold py-3 px-6 rounded-full shadow-lg"
        >
          <Sparkles className="mr-2" /> Unleash Freedom Fireworks!
        </Button>
        <Button
          onClick={triggerConfetti}
          className="bg-gradient-to-r from-blue-500 via-white to-red-500 text-red-900 hover:from-blue-600 hover:to-red-600 hover:text-white border-4 border-red-500 transition-all duration-300 text-lg font-bold py-3 px-6 rounded-full shadow-lg"
        >
          <Rocket className="mr-2" /> Launch Liberty Confetti!
        </Button>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded shadow animate-pulse border-2 border-blue-300">
              <div className="h-4 bg-red-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-blue-300 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.objectID}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-300 hover:border-red-500 transition-colors duration-300"
            >
              <h2 className="text-3xl font-extrabold mb-3 text-blue-800 border-b-4 border-red-500 pb-2">{story.title}</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-red-700 font-bold text-xl">
                  <Star className="inline mr-1 text-yellow-500" size={24} />
                  Freedom Score: {story.points * 10} 🦅
                </p>
                <p className="text-blue-600 font-bold text-xl">
                  <Zap className="inline mr-1" size={24} />
                  {story.num_comments * 5} Ultra-Patriotic Comments
                </p>
              </div>
              <div className="flex space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -1, 1, -1, 0] }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-grow"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full text-blue-900 border-4 border-blue-500 transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-red-500 via-white to-blue-500 hover:from-red-600 hover:via-white hover:to-blue-600 rounded-full shadow-lg"
                  >
                    <a href={story.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 px-6">
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300 font-extrabold text-xl">
                        🚀 Blast Off to American Innovation 🚀 <ExternalLink className="ml-2 h-6 w-6 inline" />
                      </span>
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -1, 1, -1, 0] }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TwitterShareButton
                    url={story.url}
                    title={`Check out this amazing tech story: ${story.title}`}
                    hashtags={["TechNews", "AmericanInnovation"]}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 text-blue-500 border-4 border-blue-500 transition-all duration-300 bg-white hover:bg-blue-100 rounded-full shadow-lg"
                    >
                      <Twitter className="h-6 w-6" />
                    </Button>
                  </TwitterShareButton>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
