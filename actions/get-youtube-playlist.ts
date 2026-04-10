"use server";

import { protectedActionClient } from "@/lib/action-client";

function parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  return hours * 3600 + minutes * 60 + seconds;
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const t = new Date();

  return (
    d.getFullYear() === t.getFullYear() &&
    d.getMonth() === t.getMonth() &&
    d.getDate() === t.getDate()
  );
}

export const getInputEnglishPlaylist = protectedActionClient.action(
  async () => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const playlistId = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID;

    if (!apiKey || !playlistId) {
      throw new Error(
        !apiKey
          ? "YOUTUBE_API_KEY nao configurada"
          : "YOUTUBE_PLAYLIST_ID nao configurada",
      );
    }

    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`,
    );

    const playlistData = await playlistResponse.json();

    const playlistTitle = playlistData.items?.[0]?.snippet?.title ?? "Playlist";

    const playlistItems: Array<{ videoId: string; addedAt: string }> = [];
    let nextPageToken: string | undefined;

    do {
      const url = new URL(
        "https://www.googleapis.com/youtube/v3/playlistItems",
      );

      url.searchParams.set("part", "snippet,contentDetails");
      url.searchParams.set("playlistId", playlistId);
      url.searchParams.set("maxResults", "50");
      url.searchParams.set("key", apiKey);

      if (nextPageToken) {
        url.searchParams.set("pageToken", nextPageToken);
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      for (const item of data.items ?? []) {
        const videoId = item.contentDetails?.videoId;
        const addedAt = item.snippet?.publishedAt;

        if (videoId) {
          playlistItems.push({ videoId, addedAt });
        }
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    //duração total da playlist
    let totalDurationSeconds = 0;
    let todayDurationSeconds = 0;

    for (let i = 0; i < playlistItems.length; i += 50) {
      const batch = playlistItems.slice(i, i + 50);
      const ids = batch.map((b) => b.videoId).join(",");

      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${apiKey}`,
      );

      const detailsData = await detailsRes.json();

      for (let index = 0; index < (detailsData.items ?? []).length; index++) {
        const item = detailsData.items[index];
        const duration = parseISO8601Duration(
          item.contentDetails?.duration ?? "PT0S",
        );

        totalDurationSeconds += duration;

        const video = batch[index]; 

        if (video && isToday(video.addedAt)) {
          todayDurationSeconds += duration;
        }
      }
    }

    return {
      totalDurationFormatted: formatDuration(totalDurationSeconds),
      todayDurationFormatted: formatDuration(todayDurationSeconds),
      playlistTitle,
    };
  },
);
