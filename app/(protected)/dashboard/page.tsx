import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { WordsTab } from "./wordTab/page";
import { MetricsTab } from "./metricsTab/page";
import { CommonTab } from "./commonTab/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/ui/Header";
import { getWords } from "@/data/word";
import { getCommonCategories, getCommonPhrases } from "@/data/common";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const words = await getWords(session.user.id);
  const commonPhrases = await getCommonPhrases({ userId: session.user.id });
  const commonCategories = await getCommonCategories();

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="words" className="w-full">
          <TabsList className="bg-card/50 border-border/50 mx-auto mb-8 grid h-11 w-full max-w-xl grid-cols-3 gap-1 rounded-xl border p-1 backdrop-blur-sm">
            <TabsTrigger
              value="words"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground h-full rounded-lg transition-all duration-200 data-[state=active]:shadow-lg"
            >
              Words
            </TabsTrigger>
            <TabsTrigger
              value="commons"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground h-full rounded-lg transition-all duration-200 data-[state=active]:shadow-lg"
            >
              Commons
            </TabsTrigger>
            <TabsTrigger
              value="metrics"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground h-full rounded-lg transition-all duration-200 data-[state=active]:shadow-lg"
            >
              Metrics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="words">
            <WordsTab words={words} />
          </TabsContent>
          <TabsContent value="commons">
            <CommonTab commonPhrases={commonPhrases} commonCategories={commonCategories} />
          </TabsContent>
          <TabsContent value="metrics">
            <MetricsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
