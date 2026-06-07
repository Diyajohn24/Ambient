type HeaderProps = {
  mode: string;
  setShowChat: (value: boolean) => void;
  onLogout: () => void;
};
export default function Header({
  mode,
  setShowChat,
  onLogout,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1
          className={`text-7xl font-bold ${mode === "venting"
              ? "text-violet-200"
              : "text-[#7C3AED]"
            }`}
        >
          Ambient
        </h1>

        <p
          className={`text-lg ${mode === "venting"
              ? "text-violet-300"
              : "text-[#7C3AED]"
            }`}
        >
          Emotional Companion
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white shadow"
        >
          Logout
        </button>
        <button className="w-12 h-12 rounded-full bg-white shadow">
          !
        </button>

        <button
          onClick={() => setShowChat(true)}
          className="w-12 h-12 rounded-full bg-white shadow"
        >
          💬
        </button>
      </div>
    </header>
  );
}