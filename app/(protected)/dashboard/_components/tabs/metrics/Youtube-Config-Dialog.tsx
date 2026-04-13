"use client";

import { saveYoutubeConfig } from "@/actions/save-youtube-config";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { FaYoutube } from "react-icons/fa";

const formSchema = z.object({
  youtubeApiKey: z.string().min(1, "API Key é obrigatória"),
  youtubePlaylistId: z.string().min(1, "Playlist ID é obrigatório"),
});

type FormSchema = z.infer<typeof formSchema>;

interface YoutubeConfigDialogProps {
  hasConfig: boolean;
}

export function YoutubeConfigDialog({ hasConfig }: YoutubeConfigDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { executeAsync, isPending } = useAction(saveYoutubeConfig);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeApiKey: "",
      youtubePlaylistId: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await executeAsync(data);

    if (result?.serverError) {
      toast.error("Error saveing configuration. Please try again.");
      return;
    }

    if (result?.validationErrors) {
      toast.error("Please check the fields and try again.");
      return;
    }

    toast.success("Configurations saved successfully!");
    setIsOpen(false);
    form.reset();
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="border-border/50 hover:bg-primary/80 h-8 gap-1.5 rounded-lg font-semibold"
        >
          <Settings className="h-3.5 w-3.5" />
          {hasConfig ? "Update Credentials" : "Configure Credentials YouTube"}
        </Button>
      </DialogTrigger>

      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <FaYoutube className="h-5 w-5 text-red-500" />
            Configuration of YouTube Metrics
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            Your credentials are encrypted before being saved.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-foreground text-sm font-medium">
              YouTube API Key
            </label>
            <Input
              placeholder="AIzaSy..."
              type="password"
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl font-mono text-sm transition-all"
              {...form.register("youtubeApiKey")}
            />
            {form.formState.errors.youtubeApiKey && (
              <p className="text-destructive text-xs">
                {form.formState.errors.youtubeApiKey.message}
              </p>
            )}
            <p className="text-muted-foreground text-xs">
              Generate your key at{" "}
              <a
                href="https://console.cloud.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline transition-colors"
              >
                Google Cloud Console
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-foreground text-sm font-medium">
              Playlist ID
            </label>
            <Input
              placeholder="PLxxxxxxxxxxxxxxxx"
              className="bg-muted/30 border-border/50 focus:border-primary/50 h-11 rounded-xl font-mono text-sm transition-all"
              {...form.register("youtubePlaylistId")}
            />
            {form.formState.errors.youtubePlaylistId && (
              <p className="text-destructive text-xs">
                {form.formState.errors.youtubePlaylistId.message}
              </p>
            )}
            <p className="text-muted-foreground text-xs">
              Find your Playlist ID in the URL of your YouTube playlist.
            </p>
          </div>

          <div className="border-border/50 bg-muted/20 rounded-xl border p-3">
            <p className="text-muted-foreground text-xs leading-relaxed">
              🔒 Your credentials are encrypted before being stored. We never
              share your data with third parties.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="shadow-primary/20 h-11 w-full rounded-xl shadow-lg transition-all"
          >
            {isPending ? "Saving..." : "Save Configurations"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
