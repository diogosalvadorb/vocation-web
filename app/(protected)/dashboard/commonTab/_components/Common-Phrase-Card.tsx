"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CommonPhraseCard() {
  const handlePlayAudio = async (e: React.MouseEvent) => {
    console.log("Playing audio for phrase:");
  };

  return (
    <Card className="border-border/50 bg-card/80 hover:bg-card hover:border-primary/30 hover:shadow-primary/5 group p-4 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlayAudio}
          className="mt-0.5 h-9 w-9 shrink-0 rounded-lg transition-colors"
        ></Button>

        <div className="min-w-0 flex-1">
          <p className="text-foreground group-hover:text-primary font-semibold transition-colors">
            TEXT
          </p>
          <p className="text-muted-foreground mt-0.5 text-sm">Translation</p>
        </div>
      </div>
    </Card>
  );
}
