"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddCommonPhraseDialog } from "./_components/Add-Common-Phrase-Dialog";
import { useState } from "react";
import { CommonPhraseCard } from "./_components/Common-Phrase";

export function CommonTab() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search phrase or translation..."
            className="bg-card/50 border-border/50 focus:bg-card focus:border-primary/50 h-11 rounded-xl pl-11 transition-all"
          />
        </div>
        <AddCommonPhraseDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} />
      </div>
      <CommonPhraseCard></CommonPhraseCard>
      <CommonPhraseCard></CommonPhraseCard>
      <CommonPhraseCard></CommonPhraseCard>
      <CommonPhraseCard></CommonPhraseCard>
    </div>
  );
}
