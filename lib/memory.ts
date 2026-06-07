import OpenAI from "openai";
import { pool } from "./db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function saveMessage(role: string, content: string) {

  // Generate embedding
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: content,
  });

  const embedding = embeddingResponse.data[0].embedding;

  // Save into PostgreSQL
  await pool.query(
    `
    INSERT INTO messages (role, content, embedding)
    VALUES ($1, $2, $3)
    `,
    [role, content, JSON.stringify(embedding)]
  );

  console.log("Saved to database");
}