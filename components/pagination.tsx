"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 pt-4 pb-2">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-1 text-muted-foreground text-sm select-none"
          >
            …
          </span>
        ) : (
          <Button
            key={page}
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange(page as number)}
            className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${
              currentPage === page
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}