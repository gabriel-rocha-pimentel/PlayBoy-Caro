// src/hooks/useYouTubeStats.js
import { useEffect, useState } from 'react';

const API_KEY    = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export default function useYouTubeStats() {
  const [stats, setStats] = useState({
    subscriberCount: 0,
    videoCount:      0,
    viewCount:       0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) {
      setError('Missing API key or Channel ID');
      setIsLoading(false);
      return;
    }

    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        const s = data.items?.[0]?.statistics;
        if (s) {
          setStats({
            subscriberCount: parseInt(s.subscriberCount  || '0', 10),
            videoCount:      parseInt(s.videoCount       || '0', 10),
            viewCount:       parseInt(s.viewCount        || '0', 10)
          });
        }
      })
      .catch(err => {
        console.error('Erro YouTube API:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { ...stats, isLoading, error };
}
