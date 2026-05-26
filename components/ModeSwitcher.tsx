type ModeSwitcherProps = {
  mode: string;
  setMode: (mode: string) => void;
};

export default function ModeSwitcher({
  mode,
  setMode,
}: ModeSwitcherProps) {
  return (
    <div className="flex justify-center mb-10">
      <div className="bg-white p-2 rounded-3xl shadow-lg flex gap-2">

        <button
          onClick={() => setMode("companion")}
          className={`px-10 py-4 rounded-2xl text-lg font-semibold transition-all ${
            mode === "companion"
              ? "bg-[#7C3AED] text-white shadow"
              : "text-slate-700"
          }`}
        >
          Companion
        </button>

        <button
          onClick={() => setMode("venting")}
          className={`px-10 py-4 rounded-2xl text-lg font-semibold transition-all ${
            mode === "venting"
              ? "bg-[#7C3AED] text-white shadow"
              : "text-slate-700"
          }`}
        >
          Venting
        </button>

      </div>
    </div>
  );
}