import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SpotifyPlayer = ({ artistName = "PlayBoy Caro", spotifyUri = "spotify:artist:exampleartistid" }) => {
  const { toast } = useToast();

  const handleOpenSpotify = () => {
    if (spotifyUri) {
      window.open(`https://open.spotify.com/artist/${spotifyUri.split(':')[2]}`, '_blank');
    } else {
      toast({
        title: "🚧 URI do Spotify não configurado.",
        duration: 3000,
      });
    }
  };

  const handlePlayerAction = (action) => {
    toast({
      title: "🚧 Este recurso não está implementado ainda—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
      description: "A funcionalidade completa do player requer integração com a API do Spotify.",
      duration: 5000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">
          Ouça <span className="gold-gradient">{artistName}</span> no Spotify
        </h3>
        <img  className="w-24 h-auto mx-auto my-3" alt="Logo do Spotify" src="https://images.unsplash.com/photo-1642310290559-53902b3b0f2e" />
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <p className="text-white font-medium">Último Lançamento</p>
          <p className="text-gray-400 text-sm">Nome da Música Mais Recente</p>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-green-400"
            onClick={() => handlePlayerAction('previous')}
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-green-400 bg-green-600 hover:bg-green-700 rounded-full p-3"
            onClick={() => handlePlayerAction('play')}
          >
            <Play className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-green-400"
            onClick={() => handlePlayerAction('next')}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-gray-400" />
          <div className="flex-1 h-1 bg-gray-600 rounded-full">
            <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <Button
          onClick={handleOpenSpotify}
          className="w-full bg-green-500 hover:bg-green-600 text-white mt-4"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Abrir no Spotify
        </Button>
      </div>
    </motion.div>
  );
};

export default SpotifyPlayer;