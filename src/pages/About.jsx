import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MicOff as MicVocal,
  Users,
  Award,
  Disc3,
  TrendingUp,
  Music2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const About = () => {
  const artistName = "PlayBoy Caro";
  const realName = "Murillo Lima";

  const [stats, setStats] = useState({
    videoCount: 0,
    subscriberCount: 0,
    viewCount: 0,
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram_url: '',
    youtube_channel_url: ''
  });

  useEffect(() => {
    const fetchYouTubeStats = async () => {
      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
        if (!apiKey || !channelId) {
          console.error('Variáveis de ambiente VITE_YOUTUBE_API_KEY ou VITE_YOUTUBE_CHANNEL_ID não definidas');
          return;
        }

        // 1. Buscar estatísticas do canal
        const channelStatsRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);
        const channelStatsData = await channelStatsRes.json();

        const subscriberCount = Number(channelStatsData?.items?.[0]?.statistics?.subscriberCount || 0);
        const videoCount = Number(channelStatsData?.items?.[0]?.statistics?.videoCount || 0);

        // 2. Buscar todos os vídeos do canal e somar visualizações
        let nextPageToken = '';
        let allVideoIds = [];

        do {
          const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=id&maxResults=50&pageToken=${nextPageToken}`);
          const searchData = await searchRes.json();
          const videoIds = searchData.items
            .filter(item => item.id.kind === 'youtube#video')
            .map(item => item.id.videoId);

          allVideoIds.push(...videoIds);
          nextPageToken = searchData.nextPageToken || '';
        } while (nextPageToken);

        let totalViews = 0;
        for (let i = 0; i < allVideoIds.length; i += 50) {
          const idsBatch = allVideoIds.slice(i, i + 50).join(',');
          const videosRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${idsBatch}&key=${apiKey}`);
          const videosData = await videosRes.json();

          videosData.items.forEach(video => {
            totalViews += Number(video.statistics.viewCount || 0);
          });
        }

        setStats({
          videoCount,
          subscriberCount,
          viewCount: totalViews
        });
      } catch (error) {
        console.error("Erro ao buscar estatísticas do YouTube:", error);
      }
    };

    fetchYouTubeStats();
  }, []);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data, error } = await supabase
        .from('artist_info')
        .select('instagram_url, youtube_channel_url')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar links sociais:', error.message);
      } else if (data) {
        setSocialLinks({
          instagram_url: data.instagram_url,
          youtube_channel_url: data.youtube_channel_url
        });
      }
    };

    fetchSocialLinks();
  }, []);

  const milestones = [
    {
      icon: Music2,
      label: 'Singles Lançados',
      value: stats.videoCount
    },
    {
      icon: Users,
      label: 'Fãs nas Redes',
      value: stats.subscriberCount >= 0
        ? `${(stats.subscriberCount / 1000).toFixed(1)}K`
        : '—'
    },
    {
      icon: TrendingUp,
      label: 'Visualizações YouTube',
      value: stats.viewCount >= 0
        ? `${(stats.viewCount / 1000000).toFixed(1)}M`
        : '—'
    },
    {
      icon: Disc3,
      label: 'Gravadora Atual',
      value: 'GTTBOYS'
    }
  ];

  const values = [
    {
      icon: MicVocal,
      title: 'Autenticidade no Trap',
      description: 'Letras que refletem o estilo musical do trap, com seu luxo e ostentação nas ruas.'
    },
    {
      icon: TrendingUp,
      title: 'Ascensão Meteórica',
      description: 'Conquistando o cenário nacional com hits virais e uma base de fãs fiel e engajada.'
    },
    {
      icon: Award,
      title: 'Reconhecimento e Futuro',
      description: `Buscando sempre inovar e expandir sua influência, ${artistName} é uma promessa consolidada no trap brasileiro.`
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gold-gradient">
              SOBRE {artistName.toUpperCase()}
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A trajetória de {realName}, o artista por trás do fenômeno {artistName}.
          </p>
        </motion.div>

        {/* Intro & Imagem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              PlayBoy Caro <span className="gold-gradient">Sossa</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Desde o início da sua trajetória no cenário do trap, {realName} vem construindo sua identidade com autenticidade e ousadia como {artistName}. 
              Iniciando sua carreira recentemente, o artista encontrou nos beats disponíveis
              no SoundCloud a base para expressar sua visão de mundo e seu estilo de vida acelerado.
            </p>
            <br />
            <p className="text-gray-300 text-lg leading-relaxed">
              Inspirado pelo luxo, velocidade e a energia das festas, suas letras retratam uma vivência marcada por carros potentes, 
              mulheres sedutoras e a adrenalina de quem não aceita viver na média.
              Cada faixa é um reflexo direto da sua realidade e aspiração, misturando ambição, 
              liberdade e ostentação com a batida pesada do trap contemporâneo.
            </p>
          </div>

          <div className="relative">
            <img
              className="w-full h-auto md:h-[500px] object-cover rounded-2xl shadow-2xl"
              alt="PlayBoy Caro em estúdio de gravação"
              src="https://ucdfvmryrupilyhxwzgf.supabase.co/storage/v1/object/public/images/profile/playboy-caro.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
          </div>
        </motion.div>

        {/* Milestones Dinâmicos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center glass-effect rounded-xl p-6 hover-glow"
              >
                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <m.icon className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">{m.value}</div>
                <div className="text-gray-300 text-sm">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

                <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Filosofia</span> <span className="gold-gradient">do Artista</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Os pilares que sustentam a arte de {artistName}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-effect rounded-xl p-8 text-center hover-glow_yellow transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <value.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title.replace('{artistName}', artistName)}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description.replace('{artistName}', artistName)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Redes Sociais: busca dinâmica do Supabase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass-effect rounded-2xl p-10 md:p-12 max-w-4xl mx-auto shadow-2xl">
            <MicVocal className="h-16 w-16 text-yellow-400 mx-auto mb-6 music-note" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Junte-se à <span className="gold-gradient">Nação {artistName}</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Fique por dentro dos lançamentos, shows e novidades. Siga {artistName} nas redes sociais e faça parte dessa caminhada vitoriosa no trap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={socialLinks.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
              >
                Seguir no Instagram
              </motion.a>
              <motion.a
                href={socialLinks.youtube_channel_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
              >
                Inscrever-se no YouTube
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
