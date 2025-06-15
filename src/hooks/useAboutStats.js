// src/hooks/useAboutStats.js
import { useState, useEffect, useMemo } from 'react';
import useYouTubeStats from './useYouTubeStats';
import { supabase } from '@/lib/supabase';
import {
  Music2,
  Users,
  TrendingUp,
  Disc3,
  MicOff as MicVocal,
  Award
} from 'lucide-react';

export default function useAboutStats() {
  const artistName = 'PlayBoy Caro';
  const realName = 'Murillo Lima';
  const stats = useYouTubeStats();

  const [socialLinks, setSocialLinks] = useState({
    instagram_url: '',
    youtube_channel_url: ''
  });

  useEffect(() => {
    supabase
      .from('artist_info')
      .select('instagram_url, youtube_channel_url')
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setSocialLinks(data);
      })
      .catch(console.error);
  }, []);

  const milestones = useMemo(() => [
    {
      icon: Music2,
      label: 'Singles Lançados',
      value: stats.videoCount || 0
    },
    {
      icon: Users,
      label: 'Fãs nas Redes',
      value: stats.subscriberCount || 0
    },
    {
      icon: TrendingUp,
      label: 'Visualizações YouTube',
      value: stats.viewCount || 0
    },
    {
      icon: Disc3,
      label: 'Gravadora Atual',
      value: 'GTTBOYS'
    }
  ], [stats]);

  const values = useMemo(() => [
    {
      icon: MicVocal,
      title: 'Autenticidade no Trap',
      description:
        'Letras que refletem o estilo musical do trap, com seu luxo e ostentação nas ruas.'
    },
    {
      icon: TrendingUp,
      title: 'Ascensão Meteórica',
      description:
        'Conquistando o cenário nacional com hits virais e uma base de fãs fiel e engajada.'
    },
    {
      icon: Award,
      title: 'Reconhecimento e Futuro',
      description: `Buscando sempre inovar e expandir sua influência, ${artistName} é uma promessa consolidada no trap brasileiro.`
    }
  ], []);

  return {
    artistName,
    realName,
    stats,
    socialLinks,
    milestones,
    values
  };
}
