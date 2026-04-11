"use server";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import { generateAndUploadAudio } from "@/lib/openai-tts";
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

    try {
      const soundUrl = await generateAndUploadAudio(
        parsedInput.text,
        "sentence",
        sentence.id,
      );

      const updated = await prisma.exampleSentence.update({
        where: { id: sentence.id },
        data: { soundUrl },
      });

      return updated;
    } catch (err) {
      console.error("[TTS] Failed to generate audio for Sentence:", err);
      return sentence;
    }
  });
