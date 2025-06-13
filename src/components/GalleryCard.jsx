
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const GalleryCard = ({ item, index }) => {
  const { toast } = useToast();

  const handleViewVideo = () => {
    if (item.youtube_url) {
      window.open(item.youtube_url, '_blank');
    } else {
      toast({
        title: "🚧 Este recurso não está implementado ainda—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="bg-black/40 border-red-900/30 hover-glow overflow-hidden">
        <div className="relative">
          <img
            src={item.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop`}
            alt={item.title}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                onClick={handleViewVideo}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                Ver Vídeo
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-red-900/30 text-yellow-400 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button
            variant="outline"
            onClick={handleViewVideo}
            className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <Eye className="h-4 w-4 mr-2" />
            Assistir
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GalleryCard;
