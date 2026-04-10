interface VideoMetricsProps {
  playlistTitle: string;
  todayVideosCount: number;
  totalDurationFormatted: string;
}

export function VideoMetrics({ dataVideo }: { dataVideo: VideoMetricsProps }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 shadow">
      <h3 className="text-lg font-semibold">Video Metrics</h3>
      <p className="text-sm text-gray-600">Playlist: {dataVideo.playlistTitle}</p>
      <p className="text-sm text-gray-600">Today: {dataVideo.todayVideosCount} videos</p>
      <p className="text-sm text-gray-600">Total Duration: {dataVideo.totalDurationFormatted}</p>
    </div>
  );
}