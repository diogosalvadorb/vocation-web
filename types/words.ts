import { ExampleSentence } from "@/generated/prisma/browser";

export interface Word {
  id: string;
  text: string;
  textTranslated: string;
  sentences: ExampleSentence[];
  soundUrl: string;
  createdAt: Date;
}