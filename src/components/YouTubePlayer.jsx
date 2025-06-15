import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Variáveis de ambiente (prefixo VITE_ obrigatório no Vite)
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const DEFAULT_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

/**
 * YouTubePlayer
 * Exibe o vídeo mais recente do canal.
 *
 * Props opcionais:
 *  - channelId: ID do canal do YouTube (cai no padrão do .env se omitido).
 *  - artistName: nome visível no título.
 */
const YouTubePlayer = ({
  channelId = DEFAULT_CHANNEL_ID,
  artistName = 'Artista',
}) => {
  const { toast } = useToast();
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      if (!API_KEY) {
        toast({
          title: '⚠️ Chave de API ausente',
          description: 'Defina VITE_YOUTUBE_API_KEY em seu .env',
          duration: 5000,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (!channelId) {
        toast({
          title: '⚠️ channelId não informado',
          description: 'Passe a prop ou defina VITE_YOUTUBE_CHANNEL_ID',
          duration: 5000,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      try {
        // 1) Descobre a playlist de uploads do canal
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${channelId}&part=contentDetails`
        );
        const channelData = await channelRes.json();
        const uploadsId =
          channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsId) throw new Error('Uploads playlist não localizada');

        // 2) Recupera o último vídeo
        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsId}&part=snippet&maxResults=1`
        );
        const playlistData = await playlistRes.json();
        const latest = playlistData.items?.[0]?.snippet?.resourceId?.videoId;

        if (latest) setVideoId(latest);
        else toast({ title: 'ℹ️ Nenhum vídeo encontrado', duration: 3000 });
      } catch (err) {
        console.error(err);
        toast({
          title: '❌ Erro ao buscar vídeo',
          description: err.message,
          duration: 5000,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, [channelId, toast]);

  if (loading) return <p className="text-center text-white">Carregando vídeo...</p>;
  if (!videoId) return <p className="text-center text-white">Nenhum vídeo disponível.</p>;

  const embedSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6 w-full mx-auto"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Último vídeo de <span className="gold-gradient">{artistName}</span>
        </h3>
      </div>

      <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
        <iframe
          width="100%"
          height="100%"
          src={embedSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="text-center">
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-2"
          >
            <ExternalLink className="h-4 w-4 mr-2" /> Assistir no YouTube
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default YouTubePlayer;