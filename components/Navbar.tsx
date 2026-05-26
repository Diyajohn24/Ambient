type NavbarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Navbar({
  activeTab,
  setActiveTab,
}: NavbarProps) {
  return (
    <nav className="flex gap-4 mb-10">

      <button
        onClick={() => setActiveTab("timeline")}
        className={`px-8 py-4 rounded-2xl text-lg font-semibold transition ${
          activeTab === "timeline"
            ? "bg-[#7C3AED] text-white shadow-lg"
            : "bg-white text-slate-700 shadow"
        }`}
      >
        Timeline
      </button>

      <button
        onClick={() => setActiveTab("insights")}
        className={`px-8 py-4 rounded-2xl text-lg font-semibold transition ${
          activeTab === "insights"
            ? "bg-[#7C3AED] text-white shadow-lg"
            : "bg-white text-slate-700 shadow"
        }`}
      >
        Insights
      </button>

      <button
        onClick={() => setActiveTab("garden")}
        className={`px-8 py-4 rounded-2xl text-lg font-semibold transition ${
          activeTab === "garden"
            ? "bg-[#7C3AED] text-white shadow-lg"
            : "bg-white text-slate-700 shadow"
        }`}
      >
        Garden
      </button>

      <button
        onClick={() => setActiveTab("settings")}
        className={`px-8 py-4 rounded-2xl text-lg font-semibold transition ${
          activeTab === "settings"
            ? "bg-[#7C3AED] text-white shadow-lg"
            : "bg-white text-slate-700 shadow"
        }`}
      >
        Settings
      </button>

    </nav>
  );
}