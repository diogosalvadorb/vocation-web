import { prisma } from "@/lib/prisma";
import { Word } from "@/types/words";

export const getWords = async (userId: string): Promise<Word[]> => {
  const words = await prisma.word.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sentences: true,
    },
  });

  return words;
};