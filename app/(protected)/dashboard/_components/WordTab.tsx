import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWords } from "@/data/word";
import { Search } from "lucide-react";

interface Props {
  userId: string;
}

export async function WordsTab({ userId }: Props) {
  const words = await getWords(userId);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"/>
          <Input placeholder="Search word" className="pl-11 h-11 border-border/50 rounded-xl" />
        </div>
        <Button className="ml-2">Search</Button>
      </div>

      <div>
        {words.map((word) => (
          <div key={word.id} style={{ marginBottom: 20 }}>
            <br />
            <strong>{word.text}</strong>
            <div>
              {word.sentences.map((sentence) => (
                <div key={sentence.id}>- {sentence.content}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
