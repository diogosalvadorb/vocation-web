"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { WordCard } from "./Word-Card";
import { Word } from "@/types/words";
import { useState, useMemo } from "react";
import { AddWordDialog } from "./Add-Word-Card";
import { Pagination } from "@/components/pagination";

const WORDS_PER_PAGE = 32;

interface WordsTabProps {
  words: Word[];
}

export default function WordsTab({ words }: WordsTabProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredWords = useMemo(() => {
    if (!search.trim()) return words;
    return words.filter(
      (word) =>
        word.text.toLowerCase().includes(search.toLowerCase()) ||
        word.textTranslated.toLowerCase().includes(search.toLowerCase()),
    );
  }, [words, search]);

  const totalPages = Math.ceil(filteredWords.length / WORDS_PER_PAGE);

  const paginatedWords = useMemo(() => {
    const start = (currentPage - 1) * WORDS_PER_PAGE;
    return filteredWords.slice(start, start + WORDS_PER_PAGE);
  }, [filteredWords, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search word"
            value={search}
            onChange={handleSearchChange}
            className="bg-card/50 border-border/50 focus:bg-card focus:border-primary/50 h-11 rounded-xl pl-11 transition-all"
          />
        </div>
        <AddWordDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
      </div>

      {filteredWords.length > 0 && (
        <p className="text-muted-foreground text-sm -mt-4">
          {filteredWords.length === words.length
            ? `${words.length} word${words.length !== 1 ? "s" : ""}`
            : `${filteredWords.length} of ${words.length} word${words.length !== 1 ? "s" : ""}`}
          {totalPages > 1 && ` · page ${currentPage} of ${totalPages}`}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedWords.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>

      {filteredWords.length === 0 && (
        <p className="text-muted-foreground text-center text-sm">
          No words found.
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}