import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Volume2, VolumeX } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { createSentence } from "@/actions/create-sentence";
import { BlurredTranslation } from "@/components/blurred-translation";
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

function SentenceAudioButton({ soundUrl }: { soundUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!soundUrl) return;

    if (isPlaying) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setHasError(false);
    setIsPlaying(true);

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(soundUrl);
      } else {
        audioRef.current.src = soundUrl;
      }
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => {
        setIsPlaying(false);
        setHasError(true);
      };
      await audioRef.current.play();
    } catch {
      setIsPlaying(false);
      setHasError(true);
    }
  };

  if (!soundUrl) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePlay}
      title="Play sentence"
      className={`h-7 w-7 shrink-0 rounded-lg transition-colors ${
        hasError
          ? "text-destructive/70 hover:text-destructive"
          : "text-primary/70 hover:text-primary hover:bg-primary/10"
      }`}
    >
      {isPlaying ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : hasError ? (
        <VolumeX className="h-3 w-3" />
      ) : (
        <Volume2 className="h-3 w-3" />
      )}
    </Button>
  );
}

const formSchema = z.object({
  text: z.string().min(2).max(100),
  textTranslated: z.string().min(2).max(300),
});

type FormSchema = z.infer<typeof formSchema>;

export function WordDialog({ word, isOpen, setIsOpen }: WordDialogProps) {
  const [sentences, setSentences] = useState(word.sentences || []);

  const { executeAsync: executeCreateSentence, isPending: isCreatingSentence } =
    useAction(createSentence);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await executeCreateSentence({
      wordId: word.id,
      ...data,
    });

    const newSentence = result?.data;

    if (newSentence) {
      setSentences((prev) => [newSentence, ...prev]);
    }

    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }

    if (result.serverError) {
      return toast.error("Error creating sentence. Please try again later.");
    }

    form.reset();
    toast.success("Sentence created successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <span className="text-primary font-bold">{word.text}</span>
            <span className="text-muted-foreground text-base font-normal">
              -
            </span>
            <BlurredTranslation className="text-muted-foreground inline text-base font-normal">
              {word.textTranslated}
            </BlurredTranslation>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            List of sentences for the selected word.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
            {sentences.map((sentence) => (
              <div
                key={sentence.id}
                className="border-border/50 bg-muted/30 hover:bg-muted/50 rounded-xl border p-4 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-foreground flex-1 text-sm leading-relaxed">
                    {highlightWord(sentence.text, word.text)}
                  </p>
                  <SentenceAudioButton soundUrl={sentence.soundUrl} />
                </div>

                <BlurredTranslation className="text-muted-foreground mt-2 text-sm italic">
                  {sentence.textTranslated}
                </BlurredTranslation>
              </div>
            ))}
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <p className="text-foreground text-sm font-medium">Add Sentence</p>
            <Input
              placeholder="Sentence in English..."
              {...form.register("text")}
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
            />
            <Input
              placeholder="Translation in Portuguese..."
              {...form.register("textTranslated")}
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
            />
            <Button
              type="submit"
              disabled={isCreatingSentence}
              className="shadow-primary/20 h-11 w-full rounded-xl shadow-lg transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              {isCreatingSentence ? "Adding..." : "Add Sentence"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
