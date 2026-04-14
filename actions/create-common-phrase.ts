"use server";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import { generateAndUploadAudio } from "@/lib/openai-tts";
import z from "zod";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

const inputSchema = z.object({
  text: z.string().min(1).max(300),
  textTranslated: z.string().min(1).max(300),
  categoryIds: z.array(z.string()).min(1),
});

export const createCommonPhrase = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx }) => {
    const existingCommonPhrase = await prisma.commonPhrase.findFirst({
      where: { text: parsedInput.text },
    });

    if (existingCommonPhrase) {
      returnValidationErrors(inputSchema, {
        _errors: ["A common phrase with this text already exists."],
      });
    }
    
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
    
    try {
      const soundUrl = await generateAndUploadAudio(
        parsedInput.text,
        "common-phrase",
        phrase.id,
      );

      const updated = await prisma.commonPhrase.update({
        where: { id: phrase.id },
        data: { soundUrl },
        include: {
          categories: { include: { category: true } },
        },
      });

      return updated;
    } catch (err) {
      console.error("[TTS] Failed to generate audio for CommonPhrase:", err);

      revalidatePath("/dashboard");
      return phrase;
    }
  });