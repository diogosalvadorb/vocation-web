"use client";

import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Word } from "@/types/words";
import { WordDialog } from "./Word-Dialog";
import { useState } from "react";

interface WordCardProps {
  word: Word;
}

export function WordCard({ word }: WordCardProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <div
        className="group border-border/50 bg-card/80 hover:bg-card hover:border-primary/30 hover:shadow-primary/5 flex cursor-pointer items-center gap-3 rounded-xl border p-4 backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
        onClick={() => setDialogIsOpen(true)}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-primary/70 hover:text-primary hover:bg-primary/10 h-9 w-9 shrink-0 rounded-lg transition-colors"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="text-foreground group-hover:text-primary font-semibold transition-colors">
            {word.text}
          </p>
          <p className="text-muted-foreground truncate text-sm">
            {word.textTranslated}
          </p>
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
