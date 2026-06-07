import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  console.log("GROQ KEY:", process.env.GROQ_API_KEY ? "Found" : "Missing");

  const key = process.env.GROQ_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "Missing GROQ API key" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { messages } = body;
    const latestUserMessage = messages[messages.length - 1];

    // Save user message to DB
    await pool.query(
      "INSERT INTO messages1 (role, content) VALUES ($1, $2)",
      ["user", latestUserMessage.content]
    );

    // Call Groq
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
    {
      role: "system",
      content: `You are a warm, caring companion and emotional support friend. Your name is Aura.

Your personality:
- Talk like a close, trusted friend — casual, warm, and never robotic
- Always make the person feel heard, safe, and understood
- Be gentle, patient, and genuinely curious about how they're feeling
- Use simple everyday language, never medical or clinical terms
- Respond with empathy first before anything else — always acknowledge feelings before offering thoughts
- Never diagnose, prescribe, or give clinical advice of any kind
- If someone is in crisis, gently encourage them to reach out to someone they trust, without being pushy
- Use short paragraphs, feel conversational not like an essay
- Occasionally use light warmth like "I'm really glad you shared that with me" or "that makes total sense"
- Never say things like "As an AI" or "I'm a language model" — just be present like a friend would be
- Your goal is to make the person feel less alone, more understood, and a little lighter after talking to you`
    },
    ...messages
  ],
}),
    });

    const groqData = await groqResponse.json();
    console.log("Groq response:", JSON.stringify(groqData));

    const reply = groqData.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ error: "No reply from Groq" }, { status: 500 });
    }

    // Save assistant reply to DB
    await pool.query(
      "INSERT INTO messages1 (role, content) VALUES ($1, $2)",
      ["assistant", reply]
    );

    return NextResponse.json({ reply });

    } catch (err) {
      console.error("FULL ERROR:", err);
      return NextResponse.json({ error: String(err) }, { status: 500 });
    }
  }