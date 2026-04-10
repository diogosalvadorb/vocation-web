"use client";

import { useEffect, useState } from "react";
import { getInputEnglishPlaylist } from "@/actions/get-youtube-playlist";

export function MetricsTab() {
  const [data, setData] = useState<{
    todayVideosCount: number;
    totalDurationFormatted: string;
    playlistTitle: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await getInputEnglishPlaylist();

        if (result?.data) {
          setData(result.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="text-muted-foreground text-sm">
        Loading metrics...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load metrics
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{data.playlistTitle}</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border-border/50 rounded-xl border p-6">
          <p className="text-muted-foreground text-sm">
            Added Today
          </p>
          <p className="text-3xl font-bold">
            {data.todayVideosCount}
          </p>
        </div>

        <div className="bg-card border-border/50 rounded-xl border p-6">
          <p className="text-muted-foreground text-sm">
            Total Study Time
          </p>
          <p className="text-3xl font-bold">
            {data.totalDurationFormatted}
          </p>
        </div>
      </div>
    </div>
  );
}