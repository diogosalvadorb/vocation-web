"use server";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";
import { revalidatePath } from "next/cache";
import z from "zod";

const inputSchema = z.object({
  youtubeApiKey: z.string().min(1, "API Key é obrigatória"),
  youtubePlaylistId: z.string().min(1, "Playlist ID é obrigatório"),
});

export const saveYoutubeConfig = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        youtubeApiKey: encrypt(parsedInput.youtubeApiKey),
        youtubePlaylistId: encrypt(parsedInput.youtubePlaylistId),
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  });
