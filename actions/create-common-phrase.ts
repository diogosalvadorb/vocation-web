"use server";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import { generateAndUploadAudio } from "@/lib/openai-tts";
import z from "zod";

const inputSchema = z.object({
  text: z.string().min(1).max(300),
  textTranslated: z.string().min(1).max(300),
  categoryIds: z.array(z.string()).min(1),
});

export const createCommonPhrase = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx }) => {
    const phrase = await prisma.commonPhrase.create({
      data: {
        text: parsedInput.text,
        textTranslated: parsedInput.textTranslated,
        soundUrl: "",
        userId: ctx.user.id,
        categories: {
          create: parsedInput.categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
      include: {
        categories: { include: { category: true } },
      },
    });   
  });