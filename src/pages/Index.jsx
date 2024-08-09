import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Flag } from 'lucide-react';

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
    <div className="min-h-screen p-8 bg-blue-100 text-blue-900">
      <h1 className="text-4xl font-bold mb-8 text-center text-red-700 flex items-center justify-center">
        <Flag className="mr-2 text-blue-700" />
        Top 100 All-American Tech Stories
        <Flag className="ml-2 text-blue-700" />
      </h1>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search for freedom-loving stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto bg-white text-blue-900 placeholder-blue-400 border-2 border-red-500"
        />
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
        <div className="space-y-4">
          {filteredStories.map((story) => (
            <div key={story.objectID} className="bg-white p-4 rounded shadow border-2 border-blue-300">
              <h2 className="text-xl font-semibold mb-2 text-blue-800">{story.title}</h2>
              <p className="text-red-700 mb-2">Patriot Points: {story.points}</p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="bg-red-500 text-white hover:bg-red-600 border-2 border-blue-500"
              >
                <a href={story.url} target="_blank" rel="noopener noreferrer">
                  Read More, Fellow American! <ExternalLink className="ml-2 h-4 w-4" />
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
