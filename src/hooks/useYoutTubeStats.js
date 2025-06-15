// src/hooks/useYouTubeStats.js
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export default function useYouTubeStats() {
  const [stats, setStats] = useState({
    subscriberCount: 0,
    videoCount: 0,
    viewCount: 0
  });

  useEffect(() => {
    const fetchChannelStats = async () => {
      if (!API_KEY || !CHANNEL_ID) {
        console.warn('YouTube API key or channel ID is missing');
        return;
      }

      try {
        // Fetch channel statistics once, without iterating videos
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
          console.warn('No channel data found', data);
          return;
        }

        const { subscriberCount, videoCount, viewCount } = data.items[0].statistics;
        
        setStats({
          subscriberCount: parseInt(subscriberCount || '0', 10),
          videoCount: parseInt(videoCount || '0', 10),
          viewCount: parseInt(viewCount || '0', 10)
        });
      } catch (error) {
        console.error('Failed to fetch YouTube statistics:', error);
      }
    };

    fetchChannelStats();
  }, []);

  return stats;
}
