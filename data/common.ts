import { prisma } from "@/lib/prisma";
import { CommonPhrase } from "@/types/common";

type GetCommonPhrasesParams = {
  userId: string;
  categoryId?: string;
};

export const getCommonPhrases = async ({
  userId,
  categoryId,
}: GetCommonPhrasesParams): Promise<CommonPhrase[]> => {
  const commonPhrases = await prisma.commonPhrase.findMany({
    where: {
      userId,

      ...(categoryId && categoryId !== "all"
        ? {
            categories: {
              some: {
                categoryId,
              },
            },
          }
        : {}),
    },

    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  return commonPhrases;
};

export const getCommonCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return categories;
};
