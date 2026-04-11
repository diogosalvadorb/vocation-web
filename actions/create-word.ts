"use server";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import { generateAndUploadAudio } from "@/lib/openai-tts";
import { returnValidationErrors } from "next-safe-action";
import z from "zod";

const inputSchema = z.object({
  text: z.string(),
  textTranslated: z.string(),
});

export const createWord = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx }) => {
    const existingWord = await prisma.word.findFirst({
      where: { text: parsedInput.text },
    });

    if (existingWord) {
      returnValidationErrors(inputSchema, {
        _errors: ["A word with this text already exists."],
      });
    }

    const word = await prisma.word.create({
      data: {
        text: parsedInput.text,
        textTranslated: parsedInput.textTranslated,
        soundUrl: "",
        createdAt: new Date(),
        userId: ctx.user.id,
      },
    });

    try {
      const soundUrl = await generateAndUploadAudio(
        parsedInput.text,
        "word",
        word.id,
      );

      const updated = await prisma.word.update({
        where: { id: word.id },
        data: { soundUrl },
      });

      return updated;
    } catch (err) {
      console.error("[TTS] Failed to generate audio for Word:", err);
      return word;
    }
  });
