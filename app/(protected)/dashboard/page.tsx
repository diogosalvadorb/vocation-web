import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { WordsTab } from "./_components/WordTab";
import { MetricsTab } from "./_components/MetricsTab";
import { CommonTab } from "./_components/CommonTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/ui/Header";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

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
            <WordsTab userId={session.user.id} />
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
