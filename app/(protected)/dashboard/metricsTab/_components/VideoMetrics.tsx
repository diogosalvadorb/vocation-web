import { Card } from "@/components/ui/card";
import { Video } from "lucide-react";

interface VideoMetricsProps {
  playlistTitle: string;
  todayVideosCount: number;
  totalDurationFormatted: string;
}

export function VideoMetrics({ dataVideo }: { dataVideo: VideoMetricsProps }) {
  return (
    <div>
      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
        <Video className="h-5 w-5 text-primary" />
        Video Metrics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 border-border/50 rounded-xl">
          <span className="text-sm text-muted-foreground font-semibold">Today Videos</span>
          <p className="text-2xl font-bold text-foreground mt-1">{dataVideo.todayVideosCount} videos</p>
        </Card>
        <Card className="p-5 border-border/50 rounded-xl">
          <span className="text-sm text-muted-foreground font-semibold">Total Duration</span>
          <p className="text-2xl font-bold text-foreground mt-1">{dataVideo.totalDurationFormatted}</p>
        </Card>
      </div>  
    </div>
  );
}