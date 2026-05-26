type DashboardProps = {
  mode: string;
};

export default function Dashboard({
  mode,
}: DashboardProps) {
  return (
    <section className="grid grid-cols-2 gap-8 mb-10">

      <div
        className={`rounded-3xl p-10 shadow ${
          mode === "venting"
            ? "bg-slate-700"
            : "bg-white"
        }`}
      >
        <h2
          className={`text-4xl font-bold ${
            mode === "venting"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Emotional Weather
        </h2>

        <p
          className={`text-xl mt-4 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Bright & Energetic
        </p>

        <p
          className={`mt-4 ${
            mode === "venting"
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          You're feeling optimistic and emotionally balanced today.
        </p>
      </div>

      <div
        className={`rounded-3xl p-10 shadow ${
          mode === "venting"
            ? "bg-slate-700"
            : "bg-white"
        }`}
      >
        <h2
          className={`text-4xl font-bold ${
            mode === "venting"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Companion Bond
        </h2>

        <p className="text-5xl text-[#7C3AED] font-bold mt-4">
          73%
        </p>

        <div className="w-full h-4 bg-slate-300 rounded-full mt-6">
          <div className="w-[73%] h-4 bg-[#7C3AED] rounded-full"></div>
        </div>

        <p
          className={`mt-4 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Your connection grows through reflection and daily check-ins.
        </p>
      </div>

    </section>
  );
}