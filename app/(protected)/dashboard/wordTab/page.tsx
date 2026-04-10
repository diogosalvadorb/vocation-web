"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { WordCard } from "./_components/Word-Card";
import { Word } from "@/types/words";
import { useState, useMemo } from "react";
import { AddWordDialog } from "./_components/Add-Word-Card";

interface WordsTabProps {
  words: Word[];
}

export function WordsTab({ words }: WordsTabProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredWords = useMemo(() => {
    if (!search.trim()) return words;

    return words.filter(
      (word) =>
        word.text.toLowerCase().includes(search.toLowerCase()) ||
        word.textTranslated.toLowerCase().includes(search.toLowerCase())
    );
  }, [words, search]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search word"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card/50 border-border/50 focus:bg-card focus:border-primary/50 h-11 rounded-xl pl-11 transition-all"
          />
        </div>
        <AddWordDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredWords.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>

      {filteredWords.length === 0 && (
        <p className="text-muted-foreground text-center text-sm">
          No words found.
        </p>
      )}
    </div>
  );
}