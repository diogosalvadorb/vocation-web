import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-cbc";

function getKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key)
    throw new Error(
      "ENCRYPTION_KEY não configurada nas variáveis de ambiente.",
    );
  return Buffer.from(key, "hex");
}

export function encrypt(text: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decrypt(text: string): string {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = createDecipheriv(ALGORITHM, getKey(), iv);
  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString();
}
