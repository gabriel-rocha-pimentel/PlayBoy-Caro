import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Music, Play, MicOff as MicVocal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import YouTubePlayer from '@/components/YouTubePlayer';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Home = () => {
  const { toast } = useToast();
  const [artistInfo, setArtistInfo] = useState({
    artist_name: "PlayBoy Caro",
    banner_image_url: "https://images.unsplash.com/photo-1700940948230-465ebc062a06",
    youtube_channel_url: "https://www.youtube.com/@MurilloLimadossantos-b4h",
    instagram_url: "https://www.instagram.com/playboy_caro/",
    twitter_url: "https://twitter.com/playboycaro", // Exemplo, pode remover se não tiver
  });

  useEffect(() => {
    const fetchArtistInfo = async () => {
      const { data, error } = await supabase
        .from('artist_info')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116: no rows found, ok for single()
        toast({ title: 'Erro ao buscar informações do artista', description: error.message, variant: 'destructive' });
      } else if (data) {
        setArtistInfo(prev => ({...prev, ...data}));
      }
    };
    fetchArtistInfo();
  }, [toast]);


  const handleSocialClick = (platformUrl) => {
    if (platformUrl) {
      window.open(platformUrl, '_blank');
    } else {
      toast({
        title: `🚧 Link social não configurado.`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover"
            alt={`${artistInfo.artist_name} em show com luzes e público ao fundo`}
            src={artistInfo.banner_image_url || "https://images.unsplash.com/photo-1700940948230-465ebc062a06"} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-left max-w-4xl mx-auto px-4 md:pl-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gold-gradient">PLAYBOY</span>
              <br />
              <span className="text-white">CARO</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl">
              Murillo Lima, o fenômeno do trap nacional. Explore o universo sonoro do artista.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link to="/galeria">
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg shadow-lg hover-glow"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Clipes
                </Button>
              </Link>
              <Link to="/loja">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 text-lg shadow-lg hover-glow"
                >
                  <Music className="mr-2 h-5 w-5" />
                  Comprar Merch
                </Button>
              </Link>
            </div>
            <div className="flex space-x-4 mt-8">
                <Button variant="ghost" size="icon" onClick={() => handleSocialClick(artistInfo.instagram_url)} className="text-gray-300 hover:text-yellow-400 transition-colors"><Instagram className="h-6 w-6" /></Button>
                {artistInfo.twitter_url && 
                  <Button variant="ghost" size="icon" onClick={() => handleSocialClick(artistInfo.twitter_url)} className="text-gray-300 hover:text-yellow-400 transition-colors"><Twitter className="h-6 w-6" /></Button>
                }
                <Button variant="ghost" size="icon" onClick={() => handleSocialClick(artistInfo.youtube_channel_url)} className="text-gray-300 hover:text-yellow-400 transition-colors"><Youtube className="h-6 w-6" /></Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none">
           <MicVocal className="h-32 w-32 text-yellow-400 music-note" />
        </div>
      </section>

      <section className="py-20 px-4 bg-black/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gold-gradient">Clipe em Destaque</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Assista ao último lançamento de {artistInfo.artist_name}.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <YouTubePlayer artistName={artistInfo.artist_name} channelUrl={artistInfo.youtube_channel_url} />
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto glass-effect p-10 rounded-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Acompanhe a</span>
              <br />
              <span className="gold-gradient">Jornada do PlayBoy Caro</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore a galeria de vídeos, confira os produtos oficiais na loja e saiba mais sobre a trajetória de Murillo Lima.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sobre">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 shadow-md hover-glow"
                >
                  Sobre o Artista
                </Button>
              </Link>
              <Link to="/loja">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-3 shadow-md hover-glow"
              >
                Visitar Loja Oficial
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;