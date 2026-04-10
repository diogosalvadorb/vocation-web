import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Play } from "lucide-react";

export function WritingTimer() {
  return (
    <div>
      <h3 className="text-foreground mb-4 flex items-center gap-2 font-semibold">
        <BookOpen className="text-primary h-5 w-5" />
        Writing Timer
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50 rounded-xl p-5">
          <span className="text-muted-foreground text-sm font-semibold">
            Today Writing
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">50 min</p>
        </Card>
        <Card className="border-border/50 rounded-xl p-5">
          <span className="text-muted-foreground text-sm font-semibold">
            Total Duration
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">7 hr 10 min</p>
        </Card>
        <Card className="border-border/50 rounded-xl p-5">
          <div className="">
            <span className="text-muted-foreground text-sm font-semibold">
              Counter
            </span>
          </div>

          <p className="text-foreground mb-3 font-mono text-2xl font-bold">
            00:00:00
          </p>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 h-9 flex-1 rounded-lg transition-all"
            >
              <Play className="mr-1 h-3 w-3" />
              Start
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
