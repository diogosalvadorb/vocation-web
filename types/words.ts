import { ExampleSentence } from "@/generated/prisma/browser";

export interface Word {
  id: string;
  text: string;
  sentences: ExampleSentence[];
  soundUrl: string;
  createdAt: Date;
}