import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export default function useYouTubeStats() {
  const [stats, setStats] = useState({
    viewCount: 0,
    subscriberCount: 0,
    videoCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

        // Garantir que a URL seja uma string
        if (typeof url !== 'string' || !url.startsWith('http')) {
          throw new Error('A URL da API do YouTube não é válida.');
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const statsData = data.items[0].statistics;
          setStats({
            viewCount: parseInt(statsData.viewCount, 10),
            subscriberCount: parseInt(statsData.subscriberCount, 10),
            videoCount: parseInt(statsData.videoCount, 10)
          });
        }
      } catch (error) {
        console.error('Erro YouTube API:', error);
      }
    };

    fetchStats();
  }, []);

  return stats;
}
