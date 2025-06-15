import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MicOff as MicVocal, Instagram, Youtube, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase'; 

const Footer = () => {
  const { toast } = useToast();
  const [artistInfo, setArtistInfo] = useState({
    artist_name: "PlayBoy Caro",
    youtube_channel_url: "https://www.youtube.com/@playboy__caro",
    instagram_url: "https://www.instagram.com/playboy__caro/",
  });

  useEffect(() => {
    const fetchArtistInfo = async () => {
      const { data, error } = await supabase
        .from('artist_info')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        toast({
          title: 'Erro ao buscar informações do artista',
          description: error.message,
          variant: 'destructive'
        });
      } else if (data) {
        setArtistInfo(prev => ({ ...prev, ...data }));
      }
    };
    fetchArtistInfo();
  }, [toast]);

  const handleSocialClick = (platformUrl) => {
    if (platformUrl) {
      window.open(platformUrl, '_blank');
    } else {
      toast({
        title: '🚧 Link social não configurado.',
        duration: 3000,
      });
    }
  };

  return (
    <footer className="bg-black/90 border-t border-red-900/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bloco de descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 red-gradient rounded-lg">
                <MicVocal className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gold-gradient">
                {artistInfo.artist_name}
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              PlayBoy Caro é o reflexo puro do luxo e do excesso.
              Sua arte transborda dinheiro, mulheres, bebida e poder.
              No topo do jogo, ele vive entre motores turbinados, drinks exclusivos e noites embaladas por batidas pesadas.
              Sua presença é marcante: onde chega, o brilho aumenta, os olhares viram. Não é apenas um artista, é um estilo de vida.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <span className="text-lg font-semibold text-white mb-4 block">
              Navegação
            </span>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link to="/galeria" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Galeria
              </Link>
              <Link to="/loja" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Loja
              </Link>
              <Link to="/sobre" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Sobre
              </Link>
            </div>
          </div>

          {/* Redes sociais */}
          <div>
            <span className="text-lg font-semibold text-white mb-4 block">
              Siga o PlayBoy Caro
            </span>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick(artistInfo.instagram_url)}
                className="p-2 bg-red-900/20 rounded-lg hover:bg-red-900/40 transition-colors group"
              >
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick(artistInfo.youtube_channel_url)}
                className="p-2 bg-red-900/20 rounded-lg hover:bg-red-900/40 transition-colors group"
              >
                <Youtube className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 mt-4">
              <Mail className="h-4 w-4" />
              <span className="text-sm">murillolimadossantos127@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Créditos */}
        <div className="border-t border-red-900/30 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {artistInfo.artist_name}. Todos os direitos reservados.
            Criado com ❤️ por <a href="https://techconnect.app.br" target="_blank" rel="noopener noreferrer">Tech&Connect</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
