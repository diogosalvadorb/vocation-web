import { getWords } from "@/data/word";

export default async function Dashboard() {
  const words = await getWords();

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