import { prisma } from "@/lib/prisma";
import { Word } from "@/types/words";

export const getWords = async (): Promise<Word[]> => {
  const words = await prisma.word.findMany({
    include: {
      sentences: true,
    },
  });

  return words;
};