import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function StudySummary() {
  return (
    <div className="space-y-8">
      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        Study Summary
        </h3>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-5 bg-primary/5 border-border/50 rounded-xl">
          <span className="text-sm text-muted-foreground font-semibold">Today's Study Time</span>
          <p className="text-3xl font-bold text-primary mt-1">60 min</p>
        </Card>
        
        <Card className="p-5 bg-primary/5 border-border/50 rounded-xl">
          <span className="text-sm text-muted-foreground font-semibold">Total Study Time</span>
          <p className="text-3xl font-bold text-primary mt-1">2:30 hr</p>
        </Card>
      </div>
    </div>
  );
}