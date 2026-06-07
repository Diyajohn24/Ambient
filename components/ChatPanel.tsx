"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const COMPANION_PROMPTS = [
  "How are you feeling today?",
  "What's one thing that made you smile recently?",
  "Tell me what's on your mind.",
];

const VENTING_PROMPTS = [
  "What's been weighing on you?",
  "Let it all out — I'm listening.",
  "No judgment here. What happened?",
];

export default function ChatPanel({
  setShowChat,
  mode = "companion",
}: {
  setShowChat: (v: boolean) => void;
  mode?: string;
}) {
  const isVenting = mode === "venting";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: isVenting
        ? "This is your safe space. No filters, no advice unless you ask. I'm just here."
        : "Hey! I'm here with you. How are you feeling right now?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const prompts = isVenting ? VENTING_PROMPTS : COMPANION_PROMPTS;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: Date.now(), role: "user", text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Exclude the seeded greeting (id=0) from API history
      const apiMessages = updatedMessages
        .filter((m) => m.id !== 0)
        .map((m) => ({ role: m.role, content: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, mode }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply: string = data.reply ?? "I'm here with you. Take your time.";
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Sorry, I couldn't reach the server. Please check your API key in .env.local and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 ${
        isVenting ? "bg-slate-900/70" : "bg-[#7C3AED]/20"
      } backdrop-blur-sm`}
      onClick={(e) => e.target === e.currentTarget && setShowChat(false)}
    >
      <div
        className={`flex flex-col w-full sm:w-[400px] h-[90vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border ${
          isVenting ? "bg-slate-800 border-slate-600" : "bg-white border-[#EDE9FE]"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${
            isVenting ? "border-slate-700 bg-slate-800" : "border-[#F5F3FF] bg-[#FAFAFA]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${
                isVenting ? "bg-slate-700" : "bg-[#EDE9FE]"
              }`}
            >
              {isVenting ? "🌙" : "💜"}
            </div>
            <div>
              <p className={`font-semibold text-sm ${isVenting ? "text-slate-100" : "text-[#3B0764]"}`}>
                {isVenting ? "Safe Space" : "Companion"}
              </p>
              <p className="text-xs text-slate-400">
                {isVenting ? "No judgment. Just listening." : "Here with you"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowChat(false)}
            className={`text-xl leading-none ${
              isVenting ? "text-slate-400 hover:text-slate-200" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 ${
            isVenting ? "bg-slate-900" : "bg-[#FAFAFA]"
          }`}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {m.role === "assistant" && (
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm mt-1 ${
                    isVenting ? "bg-slate-700" : "bg-[#EDE9FE]"
                  }`}
                >
                  {isVenting ? "🌙" : "💜"}
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? isVenting
                      ? "bg-red-900/60 text-slate-100 rounded-br-sm"
                      : "bg-[#7C3AED] text-white rounded-br-sm"
                    : isVenting
                    ? "bg-slate-700 text-slate-100 rounded-bl-sm"
                    : "bg-white border border-[#EDE9FE] text-slate-700 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start gap-2">
              <div
                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
                  isVenting ? "bg-slate-700" : "bg-[#EDE9FE]"
                }`}
              >
                {isVenting ? "🌙" : "💜"}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl rounded-bl-sm ${
                  isVenting ? "bg-slate-700" : "bg-white border border-[#EDE9FE]"
                }`}
              >
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                        isVenting ? "bg-slate-400" : "bg-[#A78BFA]"
                      }`}
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div
            className={`px-4 py-2 flex gap-2 overflow-x-auto border-t ${
              isVenting ? "border-slate-700 bg-slate-800" : "border-[#F5F3FF] bg-white"
            }`}
          >
            {prompts.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                  isVenting
                    ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                    : "border-[#DDD6FE] text-[#7C3AED] hover:bg-[#F5F3FF]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div
          className={`px-4 py-3 border-t ${
            isVenting ? "border-slate-700 bg-slate-800" : "border-[#F5F3FF] bg-white"
          }`}
        >
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder={isVenting ? "Let it out…" : "How are you feeling?"}
              rows={1}
              className={`flex-1 text-sm px-4 py-2.5 rounded-2xl resize-none focus:outline-none focus:ring-2 ${
                isVenting
                  ? "bg-slate-700 text-slate-100 placeholder:text-slate-500 border border-slate-600 focus:ring-slate-500"
                  : "bg-[#F5F3FF] text-slate-700 placeholder:text-slate-400 border border-[#DDD6FE] focus:ring-[#7C3AED]"
              }`}
              style={{ maxHeight: "100px", overflowY: "auto" }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40 ${
                isVenting
                  ? "bg-red-700 hover:bg-red-600 text-white"
                  : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
              }`}
            >
              ↑
            </button>
          </div>
          <p className={`text-xs text-center mt-2 ${isVenting ? "text-slate-600" : "text-slate-400"}`}>
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}