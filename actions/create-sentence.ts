"use server"

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import z from "zod";

const inputSchema = z.object({
  wordId: z.string(),
  text: z.string(),
  textTranslated: z.string(),
});

export const createSentence = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx }) => {
    const sentence = await prisma.exampleSentence.create({
      data: {
        text: parsedInput.text,
        textTranslated: parsedInput.textTranslated,
        createdAt: new Date(),
        soundUrl: "",
        wordId: parsedInput.wordId,
      },
    });

    return sentence;
  });