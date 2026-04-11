import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddPhrasDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function AddCommonPhraseDialog({ isOpen, setIsOpen }: AddPhrasDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-primary/20 h-11 rounded-xl px-5 shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" />
          New phrase
        </Button>
      </DialogTrigger>

      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">Add common phrase</DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            Add an English phrase with translation and categories.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 pt-2">
          <div className="space-y-2">
            <Input
              placeholder="Phrase in English..."
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Translation in Portuguese..."
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
            />
          </div>

          <div className="space-y-2">
            <p className="text-foreground text-sm font-medium">Categories</p>
          </div>

          <Button
            type="submit"
            className="shadow-primary/20 h-11 w-full rounded-xl shadow-lg transition-all"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Phrase
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
