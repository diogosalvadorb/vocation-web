"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface BlurredTranslationProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function BlurredTranslation({
  children,
  className,
  title = "Show or hide translation",
}: BlurredTranslationProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <button
      type="button"
      title={title}
      aria-pressed={isVisible}
      onClick={(event) => {
        event.stopPropagation();
        setIsVisible((current) => !current);
      }}
      className={cn(
        "block max-w-full cursor-pointer text-left transition-[filter,color] duration-200",
        !isVisible && "blur-sm select-none hover:blur-[2px]",
        className,
      )}
    >
      {children}
    </button>
  );
}
