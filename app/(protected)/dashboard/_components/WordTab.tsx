import { getWords } from "@/data/word";

interface Props {
  userId: string;
}

export async function WordsTab({ userId }: Props) {

  const words = await getWords(userId);
  
  return (
    <div>
      {words.map((word) => (
        <div key={word.id} style={{ marginBottom: 20 }}>
          <br />
          <strong>{word.text}</strong>
          <div>
            {word.sentences.map((sentence) => (
              <div key={sentence.id}>- {sentence.content}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}