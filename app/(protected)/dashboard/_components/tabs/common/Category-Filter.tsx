"use client";

import { Category } from "@/types/common";

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onChange: (id: string) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const all = [{ id: "all", name: "All" }, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const active = selected === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              active
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "border-border/50 bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
