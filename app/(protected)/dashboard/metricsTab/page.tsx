"use client";

import { StudySummary } from "./_components/StudySummary";
import { VideoMetrics } from "./_components/VideoMetrics";
import { ReadingTimer } from "./_components/ReadingTimer";
import { WritingTimer } from "./_components/WritingTimer";
import { YoutubeConfigDialog } from "./_components/Youtube-Config-Dialog";
import { useCallback, useEffect, useState } from "react";
import { getInputEnglishPlaylist } from "@/actions/get-youtube-playlist";
import { PlaylistMetrics } from "@/types/video";
import { getStudyStats } from "@/actions/get-study-stats";

export function MetricsTab() {
  const [dataVideos, setDataVideos] = useState<PlaylistMetrics | null>(null);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [hasYoutubeConfig, setHasYoutubeConfig] = useState<boolean | null>(
    null,
  );
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
          setHasYoutubeConfig(true);
        }
      } catch (err) {
        console.error(err);
        setHasYoutubeConfig(false);
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

  const totalToday =
    studyData.reading.today +
    studyData.writing.today +
    Math.floor((dataVideos?.todayDurationSeconds ?? 0) / 60);

  const totalAll =
    studyData.reading.total +
    studyData.writing.total +
    Math.floor((dataVideos?.totalDurationSeconds ?? 0) / 60);

  return (
    <div className="space-y-8">
      {loadingStudy ? (
        <div className="text-muted-foreground text-sm">
          Loading study metrics...
        </div>
      ) : (
        <>
          <StudySummary totalToday={totalToday} totalAll={totalAll} />

          {loadingVideos ? (
            <div className="text-muted-foreground text-sm">
              Loading video metrics...
            </div>
          ) : !hasYoutubeConfig ? (
            <div className="border-border/50 bg-card/50 flex flex-col items-center gap-3 rounded-xl border p-6 text-center">
              <p className="text-muted-foreground text-sm font-semibold">
                Configure your YouTube API Key and Playlist ID to view your
                video metrics.
              </p>
              <YoutubeConfigDialog hasConfig={false} />
            </div>
          ) : dataVideos ? (
            <VideoMetrics
              dataVideo={dataVideos}
              hasYoutubeConfig={hasYoutubeConfig}
            />
          ) : null}

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
        </>
      )}
    </div>
  );
}
