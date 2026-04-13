"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CommonPhrase } from "@/types/common";
import { Loader2, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

interface CommonPhraseCardProps {
  commonPhrase: CommonPhrase;
}

export function CommonPhraseCard({ commonPhrase }: CommonPhraseCardProps) {
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!commonPhrase.soundUrl) return;

    if (isPlaying) {
      audioRef.current?.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    setHasError(false);
    setIsPlaying(true);

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(commonPhrase.soundUrl);
      } else {
        audioRef.current.src = commonPhrase.soundUrl;
      }

      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => {
        setIsPlaying(false);
        setHasError(true);
      };

      await audioRef.current.play();
    } catch {
      setIsPlaying(false);
      setHasError(true);
    }
  };

  const hasAudio = Boolean(commonPhrase.soundUrl);

  return (
    <Card className="border-border/50 bg-card/80 hover:bg-card hover:border-primary/30 hover:shadow-primary/5 group p-4 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlayAudio}
          disabled={!hasAudio}
          title={hasAudio ? "Play pronunciation" : "No audio yet"}
          className={`mt-0.5 h-9 w-9 shrink-0 rounded-lg transition-colors ${
            hasError
              ? "text-destructive/70 hover:text-destructive hover:bg-destructive/10"
              : "text-primary/70 hover:text-primary hover:bg-primary/10"
          }`}
        >
          {isPlaying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : hasError ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>

        <div className="min-w-0 flex-1">
          <p className="text-foreground group-hover:text-primary font-semibold transition-colors">
            {commonPhrase.text}
          </p>
          <p className="text-muted-foreground mt-0.5 text-sm">
            {commonPhrase.textTranslated}
          </p>
        </div>
      </div>
    </Card>
  );
}
