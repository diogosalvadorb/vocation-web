import { getWords } from "@/data/word";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Dashboard() {
 const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }
  const words = await getWords(session.user.id);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {words.map((word) => (
          <div key={word.id} style={{ marginBottom: 20 }}>
            <br />
            <strong>{word.text}</strong>
            <div>
              {word.sentences.map((sentence) => (
                <div key={sentence.id}>
                  - {sentence.content} 
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}