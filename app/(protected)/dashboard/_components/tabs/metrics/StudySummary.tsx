import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface StudySummaryProps {
  totalToday: number;
  totalAll: number;
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) return `${hours}h ${mins}min`;
  return `${mins}min`;
}

export function StudySummary({ totalToday, totalAll }: StudySummaryProps) {
  return (
    <div className="space-y-8">
      <h3 className="text-foreground mb-4 flex items-center gap-2 font-semibold">
        <Clock className="text-primary h-5 w-5" />
        Study Summary
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-primary/5 border-border/50 rounded-xl p-5">
          <span className="text-muted-foreground text-sm font-semibold">
            Today's Study Time
          </span>
          <p className="text-primary mt-1 text-3xl font-bold">
            {formatTime(totalToday)}
          </p>
        </Card>

        <Card className="bg-primary/5 border-border/50 rounded-xl p-5">
          <span className="text-muted-foreground text-sm font-semibold">
            Total Study Time
          </span>
          <p className="text-primary mt-1 text-3xl font-bold">
            {formatTime(totalAll)}
          </p>
        </Card>
      </div>
    </div>
  );
}
