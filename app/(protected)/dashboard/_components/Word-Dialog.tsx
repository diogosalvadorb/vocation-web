import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Word } from "@/types/words";

interface WordDialogProps {
  word: Word;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WordDialog({ word, open, onOpenChange }: WordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Sentences</DialogTitle>
          <DialogDescription>
            List of sentences for the selected word.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ul>
            {word.sentences?.map((sentence) => (
              <div key={sentence.id}>
                <li>{sentence.text}</li>
                <li>{sentence.textTranslated}</li>
              </div>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
