import { createCommonPhrase } from "@/actions/create-common-phrase";
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
import { Category } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface AddPhrasDialogProps {
  isOpen: boolean;
  categories: Category[];
  setIsOpen: (open: boolean) => void;
}

const formSchema = z.object({
  text: z.string().min(1, "Required").max(300),
  textTranslated: z.string().min(1, "Required").max(300),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});

type FormSchema = z.infer<typeof formSchema>;

export function AddCommonPhraseDialog({
  isOpen,
  categories,
  setIsOpen,
}: AddPhrasDialogProps) {
  const {
    executeAsync: executeCreateCommonPhrase,
    isPending: isPendingCommonPhrase,
  } = useAction(createCommonPhrase);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      textTranslated: "",
      categoryIds: [],
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await executeCreateCommonPhrase(data);

    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }

    if (result.serverError) {
      return toast.error(
        "Error creating common phrase. Please try again later.",
      );
    }

    setIsOpen(false);
    form.reset();
    toast.success("Common phrase created successfully");
  };

  const selectedIds = form.watch("categoryIds");

  const toggleCategory = (id: string) => {
    const current = form.getValues("categoryIds");
    if (current.includes(id)) {
      form.setValue(
        "categoryIds",
        current.filter((c) => c !== id),
        { shouldValidate: true },
      );
    } else {
      form.setValue("categoryIds", [...current, id], { shouldValidate: true });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Input
              placeholder="Phrase in English..."
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
              {...form.register("text")}
            />
            {form.formState.errors.text && (
              <p className="text-destructive text-xs">
                {form.formState.errors.text.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Translation in Portuguese..."
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl transition-all"
              {...form.register("textTranslated")}
            />
            {form.formState.errors.textTranslated && (
              <p className="text-destructive text-xs">
                {form.formState.errors.textTranslated.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-foreground text-sm font-medium">Categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const selected = selectedIds.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
            {form.formState.errors.categoryIds && (
              <p className="text-destructive text-xs">
                {form.formState.errors.categoryIds.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPendingCommonPhrase}
            className="shadow-primary/20 h-11 w-full rounded-xl shadow-lg transition-all"
          >
            <Plus className="mr-2 h-4 w-4" />
            {isPendingCommonPhrase ? "Adding..." : "Add Phrase"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
