"use server";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";

export const getStudyStats = protectedActionClient.action(
  async ({ ctx }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todaySessions, allSessions] = await Promise.all([
      prisma.studySession.findMany({
        where: {
          userId: ctx.user.id,
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
      prisma.studySession.findMany({
        where: {
          userId: ctx.user.id,
        },
      }),
    ]);

    const sumByType = (sessions: typeof allSessions, type: string) =>
      sessions
        .filter((s) => s.type === type)
        .reduce((acc, s) => acc + s.minutes, 0);

    return {
      reading: {
        today: sumByType(todaySessions, "reading"),
        total: sumByType(allSessions, "reading"),
      },
      writing: {
        today: sumByType(todaySessions, "writing"),
        total: sumByType(allSessions, "writing"),
      },
    } satisfies StudyStats;
  }
);