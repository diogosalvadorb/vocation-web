import { Card } from "@/components/ui/card";
import { PlaylistMetrics } from "@/types/video";
import { Video } from "lucide-react";
import { YoutubeConfigDialog } from "./Youtube-Config-Dialog";

interface VideoMetricsProps {
  dataVideo: PlaylistMetrics;
  hasYoutubeConfig: boolean;
}

export function VideoMetrics({
  dataVideo,
  hasYoutubeConfig,
}: VideoMetricsProps) {
  return (
    <div>
      <h3 className="text-foreground mb-4 flex items-center justify-between gap-2 font-semibold">
        <span className="flex items-center gap-2">
          <Video className="text-primary h-5 w-5" />
          Video Metrics
        </span>
        <YoutubeConfigDialog hasConfig={hasYoutubeConfig} />
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border/50 rounded-xl p-5">
          <span className="text-muted-foreground text-sm font-semibold">
            Today Videos
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">
            {dataVideo.todayDurationFormatted}
          </p>
        </Card>
        <Card className="border-border/50 rounded-xl p-5">
          <span className="text-muted-foreground text-sm font-semibold">
            Total Duration
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">
            {dataVideo.totalDurationFormatted}
          </p>
        </Card>
      </div>
    </div>
  );
}
