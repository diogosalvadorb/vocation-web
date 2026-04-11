"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";
import { createWord } from "@/actions/create-word";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AddWordDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const formSchema = z.object({
  text: z.string().min(2).max(100),
  textTranslated: z.string().min(2).max(100),
});

type FormSchema = z.infer<typeof formSchema>;

export function AddWordDialog({ isOpen, setIsOpen }: AddWordDialogProps) {
  const router = useRouter();
  
  const { executeAsync: executeCreateWord, isPending: isCreatingWord } =
    useAction(createWord);

  
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      textTranslated: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await executeCreateWord(data);

    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }

    if (result.serverError) {
      return toast.error("Error creating word. Please try again later.");
    }

    setIsOpen(false);
    form.reset();
    toast.success("Word created successfully");
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="shadow-primary/20 h-11 rounded-xl px-5 shadow-lg transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          New word
        </Button>
      </DialogTrigger>

      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Add new word</DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            Fill in the fields below to add a new word.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 pt-2">
            <Input
              placeholder="Word in English..."
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
              {...form.register("text")}
            />

            <Input
              placeholder="Translation in Portuguese..."
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
              {...form.register("textTranslated")}
            />

            <Button
              type="submit"
              variant="default"
              className="shadow-primary/20 h-11 rounded-xl px-5 shadow-lg transition-all"
              disabled={isCreatingWord}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isCreatingWord ? "Adding..." : "Add Word"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
