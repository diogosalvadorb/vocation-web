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
      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        Study Summary
        </h3>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-5 bg-primary/5 border-border/50 rounded-xl">
          <span className="text-sm text-muted-foreground font-semibold">Today's Study Time</span>
          <p className="text-3xl font-bold text-primary mt-1">{formatTime(totalToday)}</p>
        </Card>
        
        <Card className="p-5 bg-primary/5 border-border/50 rounded-xl">
          <span className="text-sm text-muted-foreground font-semibold">Total Study Time</span>
          <p className="text-3xl font-bold text-primary mt-1">{formatTime(totalAll)}</p>
        </Card>
      </div>
    </div>
  );
}