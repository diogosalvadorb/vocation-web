"use client";

import { StudySummary } from "./_components/StudySummary";
import { VideoMetrics } from "./_components/VideoMetrics";
import { ReadingTimer } from "./_components/ReadingTimer";
import { WritingTimer } from "./_components/WritingTimer";
import { useCallback, useEffect, useState } from "react";
import { getInputEnglishPlaylist } from "@/actions/get-youtube-playlist";
import { PlaylistMetrics } from "@/types/video";
import { getStudyStats } from "@/actions/get-study-stats";

export function MetricsTab() {
  const [dataVideos, setDataVideos] = useState<PlaylistMetrics | null>(null);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingStudy, setLoadingStudy] = useState(true);
  const [studyData, setStudyData] = useState<StudyData>({
    reading: { today: 0, total: 0 },
    writing: { today: 0, total: 0 },
  });

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

  const loadStudyStats = useCallback(async () => {
    try {
      const result = await getStudyStats();
      if (result?.data) {
        setStudyData(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStudy(false);
    }
  }, []);

  useEffect(() => {
    loadStudyStats();
  }, [loadStudyStats]);

  const handleReadingSave = useCallback((minutes: number) => {
    setStudyData((prev) => ({
      ...prev,
      reading: {
        today: prev.reading.today + minutes,
        total: prev.reading.total + minutes,
      },
    }));
  }, []);

  const handleWritingSave = useCallback((minutes: number) => {
    setStudyData((prev) => ({
      ...prev,
      writing: {
        today: prev.writing.today + minutes,
        total: prev.writing.total + minutes,
      },
    }));
  }, []);

  if (loadingVideos) {
    return (
      <div className="text-muted-foreground text-sm">Loading metrics...</div>
    );
  }

  if (!dataVideos) {
    return <div className="text-sm text-red-500">Failed to load metrics</div>;
  }

  return (
    <div className="space-y-8">
      <StudySummary />
      <VideoMetrics dataVideo={dataVideos} />
      <ReadingTimer
        todayMinutes={studyData.reading.today}
        totalMinutes={studyData.reading.total}
        onSave={handleReadingSave}
      />
      <WritingTimer
        todayMinutes={studyData.writing.today}
        totalMinutes={studyData.writing.total}
        onSave={handleWritingSave}
      />
    </div>
  );
}
