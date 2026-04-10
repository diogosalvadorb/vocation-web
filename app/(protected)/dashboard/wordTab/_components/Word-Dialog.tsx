import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Word } from "@/types/words";
import { Plus } from "lucide-react";

interface WordDialogProps {
  word: Word;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function highlightWord(text: string, word: string) {
  const regex = new RegExp(`(${word})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === word.toLowerCase()) {
      return (
        <span
          key={index}
          className="bg-accent/90 text-accent-foreground rounded-md px-1.5 py-0.5 font-semibold"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

export function WordDialog({ word, isOpen, setIsOpen }: WordDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <span className="text-primary font-bold">{word.text}</span>
            <span className="text-muted-foreground text-base font-normal">
              — {word.textTranslated}
            </span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            List of sentences for the selected word.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
            {word.sentences?.map((sentence) => (
              <div
                key={sentence.id}
                className="border-border/50 bg-muted/30 hover:bg-muted/50 rounded-xl border p-4 transition-colors"
              >
                <p className="text-foreground text-sm leading-relaxed">
                  {highlightWord(sentence.text, word.text)}
                </p>

                <p className="text-muted-foreground mt-2 text-sm italic">
                  {sentence.textTranslated}
                </p>
              </div>
            ))}
          </div>

          <div className="border-border/50 space-y-3 border-t pt-3">
            <p className="text-foreground text-sm font-medium">Add Sentence</p>
            <Input
              placeholder="Sentence in English..."
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
            />
            <Input
              placeholder="Translation in Portuguese..."
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
            />
            <Button
              variant="default"
              className="shadow-primary/20 h-11 w-full rounded-xl shadow-lg transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Sentence
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
