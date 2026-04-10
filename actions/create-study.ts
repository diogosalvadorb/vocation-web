"use server";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import z from "zod";

const inputSchema = z.object({
  type: z.enum(["reading", "writing"]),
  minutes: z.number().int().positive(),
});

export const saveStudySession = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx }) => {

    console.log("Saving study session:", parsedInput);
    const session = await prisma.studySession.create({
      data: {
        type: parsedInput.type,
        minutes: parsedInput.minutes,
        createdAt: new Date(),
        userId: ctx.user.id,
      },
    });

    return session;
  });