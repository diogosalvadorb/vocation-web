"use client";

import { Loader2, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

import { BlurredTranslation } from "@/components/blurred-translation";
import { Button } from "@/components/ui/button";
import { Word } from "@/types/words";

import { WordDialog } from "./Word-Dialog";

interface WordCardProps {
  word: Word;
}

export function WordCard({ word }: WordCardProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!word.soundUrl) return;

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
        audioRef.current = new Audio(word.soundUrl);
      } else {
        audioRef.current.src = word.soundUrl;
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

  const hasAudio = Boolean(word.soundUrl);

  return (
    <>
      <div
        className="group border-border/50 bg-card/80 hover:bg-card hover:border-primary/30 hover:shadow-primary/5 flex cursor-pointer items-center gap-3 rounded-xl border p-4 backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
        onClick={() => setDialogIsOpen(true)}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlayAudio}
          disabled={!hasAudio}
          title={hasAudio ? "Play pronunciation" : "No audio available"}
          className={`h-9 w-9 shrink-0 rounded-lg transition-colors ${
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
            {word.text}
          </p>
          <BlurredTranslation className="text-muted-foreground truncate text-sm">
            {word.textTranslated}
          </BlurredTranslation>
        </div>
      </div>
      <WordDialog
        word={word}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
}
