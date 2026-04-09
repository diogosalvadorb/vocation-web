import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { WordsTab } from "./wordTab/page";
import { MetricsTab } from "./metricsTab/MetricsTab";
import { CommonTab } from "./commonTab/CommonTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/ui/Header";
import { getWords } from "@/data/word";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const words = await getWords(session.user.id);
  
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="words" className="w-full">
          <TabsList className="w-full max-w-xl mx-auto grid grid-cols-3 h-11 bg-card/50 backdrop-blur-sm p-1 gap-1 mb-8 rounded-xl border border-border/50">
            <TabsTrigger value="words">Words</TabsTrigger>
            <TabsTrigger value="commons">Commons</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="words">
            <WordsTab words={words} />
          </TabsContent>
          <TabsContent value="commons">
            <CommonTab />
          </TabsContent>
          <TabsContent value="metrics">
            <MetricsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
