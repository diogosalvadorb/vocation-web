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
        <Tabs defaultValue="words" className="m-auto w-100">
          <TabsList>
            <TabsTrigger value="words">Words</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="counter">Counter</TabsTrigger>
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
