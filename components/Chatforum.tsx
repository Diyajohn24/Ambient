"use client";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
  upvotes: number;
  upvoted: boolean;
}

interface Thread {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  tag: "venting" | "support" | "milestone" | "question";
  time: string;
  upvotes: number;
  upvoted: boolean;
  replies: Reply[];
}

// ── Seed Data ──────────────────────────────────────────────────────────────────
const SEED_THREADS: Thread[] = [
  {
    id: 1,
    author: "moonpetal",
    avatar: "🌸",
    title: "Finally told my therapist about the anxiety spiral — felt so relieved",
    content:
      "I've been putting this off for weeks. The moment I actually said it out loud, something shifted. Anyone else feel like naming things makes them smaller?",
    tag: "milestone",
    time: "2h ago",
    upvotes: 24,
    upvoted: false,
    replies: [
      {
        id: 1,
        author: "quietsun",
        avatar: "☀️",
        content:
          "Yes — 100%. There's actual neuroscience behind it, affect labeling. Naming the feeling activates the prefrontal cortex and dials down the amygdala. You did something brave.",
        time: "1h ago",
        upvotes: 11,
        upvoted: false,
      },
      {
        id: 2,
        author: "fernroot",
        avatar: "🌿",
        content: "This made me tear up. So proud of you, stranger.",
        time: "45m ago",
        upvotes: 8,
        upvoted: false,
      },
    ],
  },
  {
    id: 2,
    author: "driftwood_k",
    avatar: "🪵",
    title: "Can't stop doom-scrolling after 11pm. Need help breaking this",
    content:
      "I know it's wrecking my sleep and mood but every night I'm back at it. Tried deleting apps but I just reinstall. Anyone found something that actually sticks?",
    tag: "question",
    time: "5h ago",
    upvotes: 17,
    upvoted: false,
    replies: [
      {
        id: 1,
        author: "lilacloud",
        avatar: "💜",
        content:
          "Phone goes in a different room at 10:30. Not on silent — physically in another room. Game changer after about a week.",
        time: "4h ago",
        upvotes: 14,
        upvoted: false,
      },
    ],
  },
  {
    id: 3,
    author: "heron_still",
    avatar: "🦢",
    title: "Just need to get this out — work has been crushing me",
    content:
      "Manager moved the deadline up again. I haven't slept properly in 9 days. I'm not looking for solutions right now, just want someone to hear this.",
    tag: "venting",
    time: "8h ago",
    upvotes: 31,
    upvoted: false,
    replies: [],
  },
];

// ── Tag config ─────────────────────────────────────────────────────────────────
const TAG_STYLES: Record<Thread["tag"], { label: string; className: string }> = {
  venting:   { label: "Venting",   className: "bg-red-100 text-red-600 border border-red-200" },
  support:   { label: "Support",   className: "bg-blue-100 text-blue-600 border border-blue-200" },
  milestone: { label: "Milestone", className: "bg-emerald-100 text-emerald-600 border border-emerald-200" },
  question:  { label: "Question",  className: "bg-amber-100 text-amber-700 border border-amber-200" },
};

// ── Sub-components ─────────────────────────────────────────────────────────────
function Avatar({ emoji, size = "md" }: { emoji: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-8 h-8 text-base" : "w-10 h-10 text-xl";
  return (
    <div className={`${dim} rounded-full bg-[#EDE9FE] flex items-center justify-center flex-shrink-0`}>
      {emoji}
    </div>
  );
}

function UpvoteButton({
  count,
  upvoted,
  onToggle,
}: {
  count: number;
  upvoted: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all duration-150
        ${upvoted
          ? "bg-[#7C3AED] text-white shadow-sm"
          : "bg-[#EDE9FE] text-[#7C3AED] hover:bg-[#DDD6FE]"
        }`}
    >
      <span>{upvoted ? "♥" : "♡"}</span>
      <span>{count}</span>
    </button>
  );
}

function ReplyCard({
  reply,
  onUpvote,
}: {
  reply: Reply;
  onUpvote: () => void;
}) {
  return (
    <div className="flex gap-3 pt-3">
      <Avatar emoji={reply.avatar} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-[#3B0764]">{reply.author}</span>
          <span className="text-xs text-slate-400">{reply.time}</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{reply.content}</p>
        <div className="mt-2">
          <UpvoteButton count={reply.upvotes} upvoted={reply.upvoted} onToggle={onUpvote} />
        </div>
      </div>
    </div>
  );
}

function ThreadCard({
  thread,
  onUpvote,
  onReplyUpvote,
  onAddReply,
  onOpen,
  isOpen,
}: {
  thread: Thread;
  onUpvote: () => void;
  onReplyUpvote: (replyId: number) => void;
  onAddReply: (content: string) => void;
  onOpen: () => void;
  isOpen: boolean;
}) {
  const [replyText, setReplyText] = useState("");
  const tag = TAG_STYLES[thread.tag];

  const submitReply = () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;
    onAddReply(trimmed);
    setReplyText("");
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDE9FE] shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Thread header */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <Avatar emoji={thread.avatar} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-semibold text-[#3B0764] text-sm">{thread.author}</span>
              <span className="text-xs text-slate-400">{thread.time}</span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tag.className}`}>
                {tag.label}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 text-base leading-snug mb-2">
              {thread.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{thread.content}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#F5F3FF]">
          <UpvoteButton count={thread.upvotes} upvoted={thread.upvoted} onToggle={onUpvote} />
          <button
            onClick={onOpen}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <span>💬</span>
            <span>{thread.replies.length} {thread.replies.length === 1 ? "reply" : "replies"}</span>
          </button>
        </div>
      </div>

      {/* Expanded replies */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-[#F5F3FF] bg-[#FAFAFA]">
          {thread.replies.length > 0 && (
            <div className="divide-y divide-[#F0EBFF] mt-1">
              {thread.replies.map((r) => (
                <ReplyCard
                  key={r.id}
                  reply={r}
                  onUpvote={() => onReplyUpvote(r.id)}
                />
              ))}
            </div>
          )}

          {/* Reply composer */}
          <div className="mt-4 flex gap-3">
            <Avatar emoji="🙂" size="sm" />
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submitReply();
                }}
                placeholder="Write a supportive reply… (⌘+Enter to send)"
                rows={2}
                className="w-full text-sm border border-[#DDD6FE] rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent bg-white text-slate-700 placeholder:text-slate-400"
              />
              <div className="flex justify-end mt-1.5">
                <button
                  onClick={submitReply}
                  disabled={!replyText.trim()}
                  className="px-4 py-1.5 text-sm font-semibold bg-[#7C3AED] text-white rounded-full disabled:opacity-40 hover:bg-[#6D28D9] transition-colors"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── New Thread Modal ───────────────────────────────────────────────────────────
function NewThreadModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (t: Omit<Thread, "id" | "upvotes" | "upvoted" | "replies" | "time">) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<Thread["tag"]>("support");

  const submit = () => {
    if (!title.trim() || !content.trim()) return;
    onSubmit({ author: "you", avatar: "🙂", title, content, tag });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 border border-[#EDE9FE]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#3B0764]">Share with the community</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>

        {/* Tag selector */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {(Object.entries(TAG_STYLES) as [Thread["tag"], typeof TAG_STYLES[Thread["tag"]]][]).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setTag(key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all
                ${tag === key ? val.className + " ring-2 ring-offset-1 ring-[#7C3AED]" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-[#C4B5FD]"}`}
            >
              {val.label}
            </button>
          ))}
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your post a title…"
          className="w-full border border-[#DDD6FE] rounded-xl px-4 py-2.5 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-slate-700 placeholder:text-slate-400"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? This is a safe space."
          rows={4}
          className="w-full border border-[#DDD6FE] rounded-xl px-4 py-2.5 mb-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-slate-700 placeholder:text-slate-400"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!title.trim() || !content.trim()}
            className="px-5 py-2 text-sm font-semibold bg-[#7C3AED] text-white rounded-full disabled:opacity-40 hover:bg-[#6D28D9] transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function ChatForum({ mode }: { mode: string }) {
  const [threads, setThreads] = useState<Thread[]>(SEED_THREADS);
  const [openThreadId, setOpenThreadId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<Thread["tag"] | "all">("all");

  const bgAccent = mode === "venting" ? "bg-slate-700" : "bg-[#EDE9FE]";
  const textAccent = mode === "venting" ? "text-red-400" : "text-[#7C3AED]";

  const filtered = filter === "all" ? threads : threads.filter((t) => t.tag === filter);

  const upvoteThread = (id: number) =>
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, upvoted: !t.upvoted, upvotes: t.upvoted ? t.upvotes - 1 : t.upvotes + 1 }
          : t
      )
    );

  const upvoteReply = (threadId: number, replyId: number) =>
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              replies: t.replies.map((r) =>
                r.id === replyId
                  ? { ...r, upvoted: !r.upvoted, upvotes: r.upvoted ? r.upvotes - 1 : r.upvotes + 1 }
                  : r
              ),
            }
          : t
      )
    );

  const addReply = (threadId: number, content: string) =>
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              replies: [
                ...t.replies,
                { id: Date.now(), author: "you", avatar: "🙂", content, time: "just now", upvotes: 0, upvoted: false },
              ],
            }
          : t
      )
    );

  const addThread = (data: Omit<Thread, "id" | "upvotes" | "upvoted" | "replies" | "time">) => {
    const newThread: Thread = { ...data, id: Date.now(), upvotes: 0, upvoted: false, replies: [], time: "just now" };
    setThreads((prev) => [newThread, ...prev]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header bar */}
      <div className={`rounded-2xl ${bgAccent} px-5 py-4 mb-5 flex items-center justify-between`}>
        <div>
          <h2 className={`text-lg font-bold ${textAccent}`}>Community Forum</h2>
          <p className="text-xs text-slate-500 mt-0.5">A safe, anonymous space to share and support</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white text-sm font-semibold rounded-full hover:bg-[#6D28D9] transition-colors shadow-sm"
        >
          <span>✏️</span> Post
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {(["all", "venting", "support", "milestone", "question"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 text-xs font-semibold px-4 py-1.5 rounded-full transition-all
              ${filter === f
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-white text-slate-500 border border-[#DDD6FE] hover:border-[#A78BFA]"
              }`}
          >
            {f === "all" ? "All" : TAG_STYLES[f].label}
          </button>
        ))}
      </div>

      {/* Thread list */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <div className="text-center text-slate-400 text-sm py-12">
            No posts yet in this category. Be the first to share 💜
          </div>
        )}
        {filtered.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            onUpvote={() => upvoteThread(thread.id)}
            onReplyUpvote={(rId) => upvoteReply(thread.id, rId)}
            onAddReply={(c) => addReply(thread.id, c)}
            onOpen={() => setOpenThreadId(openThreadId === thread.id ? null : thread.id)}
            isOpen={openThreadId === thread.id}
          />
        ))}
      </div>

      {showModal && (
        <NewThreadModal onClose={() => setShowModal(false)} onSubmit={addThread} />
      )}
    </div>
  );
}