"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createWord } from "@/actions/create-word"
import { toast } from "sonner";

interface AddWordDialogProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function AddWordDialog({ isOpen, setIsOpen }: AddWordDialogProps) {
  const [wordText, setWordText] = useState("")
  const [translation, setTranslation] = useState("")

  const onSubmit = async () => {
  if (!wordText.trim() || !translation.trim()) {
    console.log("Campos vazios:", { wordText, translation })
    return
  }

  console.log("Valores digitados:", {
    wordText,
    translation
  })
}

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all">
          <Plus className="h-4 w-4 mr-2" />
          New word
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Add new word</DialogTitle>
          <DialogDescription className="text-muted-foreground/80">Fill in the fields below to add a new word to your vocabulary.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <Input
            placeholder="Word in English..."
            value={wordText}
            onChange={(e) => setWordText(e.target.value)}
            className="h-11 rounded-xl bg-muted/30 border-border/50 focus:border-primary/50 transition-all"
          />
          <Input
            placeholder="Translation in Portuguese..."
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="h-11 rounded-xl bg-muted/30 border-border/50 focus:border-primary/50 transition-all"
          />
          <Button
            onClick={onSubmit}
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Word
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}