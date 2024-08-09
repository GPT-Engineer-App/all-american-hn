import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Flag, Star, Zap } from 'lucide-react';

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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-red-100 via-white to-blue-100 text-blue-900">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold mb-4 text-red-700 flex items-center justify-center">
          <Flag className="mr-2 text-blue-700" />
          Top 100 All-American Tech Stories
          <Flag className="ml-2 text-blue-700" />
        </h1>
        <p className="text-xl text-blue-700 font-semibold">Celebrating Innovation and Liberty</p>
      </header>
      <div className="mb-6 relative max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Search for freedom-loving stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white text-blue-900 placeholder-blue-400 border-2 border-red-500 pl-10 pr-10"
        />
        <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
        <Zap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
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
          {filteredStories.map((story) => (
            <div key={story.objectID} className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-300 hover:border-red-500 transition-colors duration-300">
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
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full bg-gradient-to-r from-red-500 via-white to-blue-500 text-blue-900 hover:from-red-600 hover:to-blue-600 hover:text-white border-2 border-blue-500 transition-all duration-300"
              >
                <a href={story.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Explore American Innovation <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
