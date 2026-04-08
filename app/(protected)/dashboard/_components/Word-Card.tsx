"use client"

import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Word } from "@/types/words"
import { WordDialog } from "./Word-Dialog";
import { useState } from "react";

interface WordCardProps {
  word: Word
}

export function WordCard({ word }: WordCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-4 cursor-pointer hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
        onClick={() => setOpen(true)}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 text-primary/70 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{word.text}</p>
          <p className="text-sm text-muted-foreground truncate">{word.textTranslated}</p>
        </div>
      </div>
      <WordDialog word={word} open={open} onOpenChange={setOpen} />
    </>
  )
}
