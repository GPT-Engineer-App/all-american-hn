import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Flag, Star, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fireworks from '../components/Fireworks';

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

  const triggerFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 5000);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-red-100 via-white to-blue-100 animate-gradient-x bg-[length:400%_400%] text-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22%3E%3Ccircle cx=%2240%22 cy=%2240%22 r=%221%22 fill=%22%23fff%22 opacity=%220.3%22%2F%3E%3C%2Fsvg%3E')] animate-twinkle"></div>
      <Fireworks trigger={showFireworks} />
      <header className="mb-8 text-center">
        <motion.h1 
          className="text-5xl font-bold mb-4 text-red-700 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flag className="mr-2 text-blue-700" />
          Top 100 All-American Tech Stories
          <Flag className="ml-2 text-blue-700" />
        </motion.h1>
        <motion.p 
          className="text-xl text-blue-700 font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Celebrating Innovation and Liberty
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
          placeholder="Search for freedom-loving stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white text-blue-900 placeholder-blue-400 border-2 border-red-500 pl-10 pr-10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        >
          <Star className="text-red-500" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <Zap className="text-blue-500" />
        </motion.div>
      </motion.div>
      <div className="mb-6 text-center">
        <Button
          onClick={triggerFireworks}
          className="bg-gradient-to-r from-red-500 via-white to-blue-500 text-blue-900 hover:from-red-600 hover:to-blue-600 hover:text-white border-2 border-blue-500 transition-all duration-300"
        >
          <Sparkles className="mr-2" /> Celebrate with Fireworks!
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
              <h2 className="text-2xl font-bold mb-3 text-blue-800">{story.title}</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-red-700 font-semibold">
                  <Star className="inline mr-1 text-yellow-500" />
                  Freedom Score: {story.points}
                </p>
                <p className="text-blue-600">
                  <Zap className="inline mr-1" />
                  {story.num_comments} Patriotic Comments
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full text-blue-900 border-2 border-blue-500 transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-red-500 via-white to-blue-500 hover:from-red-600 hover:via-white hover:to-blue-600"
                >
                  <a href={story.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-2 px-4">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300 font-semibold">
                      Explore American Innovation <ExternalLink className="ml-2 h-5 w-5 inline" />
                    </span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
