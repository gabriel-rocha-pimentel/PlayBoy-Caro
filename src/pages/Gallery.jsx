import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Film, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GalleryCard from '@/components/GalleryCard';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(true);
  const artistName = 'PlayBoy Caro';
  const { toast } = useToast();

  const fetchYouTubeVideos = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
    const maxResults = 20;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=${maxResults}`
      );
      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      return data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        image_url: item.snippet.thumbnails?.high?.url,
        youtube_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        tags: ['youtube'],
        created_at: item.snippet.publishedAt,
      }));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true);
      try {
        const { data: dbData, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          toast({
            title: 'Erro ao buscar dados do banco de dados',
            description: error.message,
            variant: 'destructive',
          });
        }

        const ytData = await fetchYouTubeVideos();
        const combined = [...(dbData || []), ...ytData].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setGalleryItems(combined);
      } catch (err) {
        toast({
          title: 'Erro ao buscar vídeos do YouTube',
          description: err.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [toast]);

  useEffect(() => {
    let filtered = galleryItems;
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedTag) {
      filtered = filtered.filter(
        (item) => item.tags && item.tags.includes(selectedTag)
      );
    }
    setFilteredItems(filtered);
  }, [searchTerm, selectedTag, galleryItems]);

  const allTags = [...new Set(galleryItems.flatMap((item) => item.tags || []))];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gold-gradient">Galeria de Vídeos</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore os clipes, performances e bastidores de {artistName}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass-effect p-6 rounded-xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar vídeos por título ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 bg-black/50 border-red-700/50 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500 text-base"
              />
            </div>
            <div className="relative w-full md:w-auto">
              <Filter className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 md:hidden" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full pl-10 md:pl-3 pr-8 py-3 bg-black/50 border-red-700/50 text-white rounded-md focus:border-yellow-500 focus:ring-yellow-500 appearance-none text-base"
              >
                <option value="">Todas as Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag} className="bg-black text-white">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-white text-xl">Carregando vídeos...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-effect rounded-xl">
              <Film className="text-6xl mb-6 text-yellow-400 mx-auto music-note" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Nenhum vídeo encontrado {searchTerm || selectedTag ? `para "${searchTerm || selectedTag}"` : ''}
              </h3>
              <p className="text-gray-400">
                {searchTerm || selectedTag ? 'Tente refinar sua busca ou selecionar outra tag.' : 'Ainda não há vídeos na galeria. Volte em breve!'}
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-20"
        >
          <div className="glass-effect rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Quer mais {artistName}?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Visite a loja oficial para adquirir produtos exclusivos ou saiba mais sobre a trajetória do artista.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/loja">
                <Button size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-md">
                  Ir para Loja
                </Button>
              </Link>
              <Link to="/sobre">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-red-600 text-red-400 hover:bg-red-600 hover:text-white shadow-md">
                  Conhecer História
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;