"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddCommonPhraseDialog } from "./Add-Common-Phrase-Dialog";
import { useMemo, useState } from "react";
import { CommonPhraseCard } from "./Common-Phrase-Card";
import { Category, CommonPhrase } from "@/types/common";
import { CategoryFilter } from "./Category-Filter";

interface CommonTabProps {
  commonPhrases: CommonPhrase[];
  commonCategories: Category[];
}

export default function CommonTab({
  commonPhrases,
  commonCategories,
}: CommonTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = useMemo(() => {
    return commonPhrases.filter((p) => {
      const matchCategory =
        selectedCategory === "all" ||
        p.categories.some((c) => c.category.id === selectedCategory);

      const matchSearch =
        !search.trim() ||
        p.text.toLowerCase().includes(search.toLowerCase()) ||
        p.textTranslated.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [commonPhrases, selectedCategory, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search phrase or translation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card/50 border-border/50 focus:bg-card focus:border-primary/50 h-11 rounded-xl pl-11 transition-all"
          />
        </div>
        <AddCommonPhraseDialog
          isOpen={dialogOpen}
          setIsOpen={setDialogOpen}
          categories={commonCategories}
        />
      </div>
      <CategoryFilter
        categories={commonCategories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      {filtered.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center text-sm">
          {commonPhrases.length === 0
            ? "No phrases yet. Add your first common phrase!"
            : "No phrases found for this filter."}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((phrase) => (
            <CommonPhraseCard key={phrase.id} commonPhrase={phrase} />
          ))}
        </div>
      )}
    </div>
  );
}
