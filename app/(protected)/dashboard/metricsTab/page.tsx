"use client";

import { StudySummary } from "./_components/StudySummary";
import { VideoMetrics } from "./_components/VideoMetrics";
import { ReadingTimer } from "./_components/ReadingTimer";
import { WritingTimer } from "./_components/WritingTimer";
import { useEffect, useState } from "react";
import { getInputEnglishPlaylist } from "@/actions/get-youtube-playlist";

export function MetricsTab() {
const [dataVideos, setDataVideos] = useState<{
    todayVideosCount: number;
    totalDurationFormatted: string;
    playlistTitle: string;
  } | null>(null);

  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        const result = await getInputEnglishPlaylist();

        if (result?.data) {
          setDataVideos(result.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingVideos(false);
      }
    }

    loadVideos();
  }, []);

  if (loadingVideos) {
    return (
      <div className="text-muted-foreground text-sm">
        Loading metrics...
      </div>
    );
  }

  if (!dataVideos) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load metrics
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <StudySummary />
      <VideoMetrics dataVideo={dataVideos} />
      <ReadingTimer />
      <WritingTimer />
    </div>
  );
}
