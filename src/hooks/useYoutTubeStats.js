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
    async function fetchChannelStats() {
      if (!API_KEY || !CHANNEL_ID) {
        console.warn('YouTube API key or channel ID is missing');
        return;
      }

      try {
        // Fetch channel statistics
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const channelJson = await channelResponse.json();

        const channelStats = channelJson.items?.[0]?.statistics;
        if (!channelStats) {
          console.warn('No channel statistics available', channelJson);
          return;
        }

        const subscriberCount = parseInt(channelStats.subscriberCount || '0', 10);
        const videoCount = parseInt(channelStats.videoCount || '0', 10);

        // Paginate to collect all video IDs
        let nextPageToken = '';
        const videoIds = [];
        do {
          const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
          searchUrl.searchParams.set('part', 'id');
          searchUrl.searchParams.set('channelId', CHANNEL_ID);
          searchUrl.searchParams.set('maxResults', '50');
          searchUrl.searchParams.set('type', 'video');
          searchUrl.searchParams.set('key', API_KEY);
          if (nextPageToken) searchUrl.searchParams.set('pageToken', nextPageToken);

          const searchResponse = await fetch(searchUrl.toString());
          const searchJson = await searchResponse.json();

          const idsPage = searchJson.items
            .filter(item => item.id.kind === 'youtube#video')
            .map(item => item.id.videoId);

          videoIds.push(...idsPage);
          nextPageToken = searchJson.nextPageToken || '';
        } while (nextPageToken);

        // Batch fetch video statistics to sum view counts
        let totalViews = 0;
        for (let i = 0; i < videoIds.length; i += 50) {
          const batchIds = videoIds.slice(i, i + 50).join(',');
          const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${batchIds}&key=${API_KEY}`
          );
          const videosJson = await videosResponse.json();

          videosJson.items?.forEach(video => {
            const viewCount = parseInt(video.statistics.viewCount || '0', 10);
            totalViews += viewCount;
          });
        }

        setStats({
          subscriberCount,
          videoCount,
          viewCount: totalViews
        });
      } catch (error) {
        console.error('Failed to fetch YouTube statistics:', error);
      }
    }

    fetchChannelStats();
  }, []);

  return stats;
}
