import { openai } from "@ai-sdk/openai";
import { experimental_generateSpeech as generateSpeech } from "ai";
import { uploadAudioToR2 } from "@/lib/cloudflare-r2";

export async function generateAndUploadAudio(
  text: string,
  type: "word" | "sentence",
  id: string,
): Promise<string> {
  const result = await generateSpeech({
    model: openai.speech("tts-1"),
    text,
    voice: "alloy",
  });

  const buffer = Buffer.from(result.audio.base64, "base64");

  const key = `vocation/${type}/${id}.mp3`;
  const url = await uploadAudioToR2(buffer, key);

  return url;
}
