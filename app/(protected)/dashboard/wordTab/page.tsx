"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { WordCard } from "./_components/Word-Card";
import { Word } from "@/types/words";
import { useState } from "react";
import { AddWordDialog } from "./_components/Add-Word-Card";

interface WordsTabProps {
  words: Word[];
}

export function WordsTab({ words }: WordsTabProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"/>
          <Input placeholder="Search word" className="pl-11 h-11 border-border/50 rounded-xl" />
        </div>
        <div>
        <AddWordDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {words.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
}