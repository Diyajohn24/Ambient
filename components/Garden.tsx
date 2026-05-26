type GardenProps = {
  mode: string;
};

export default function Garden({
  mode,
}: GardenProps) {
  return (
    <section className="space-y-8">

      <div>
        <h2
          className={`text-5xl font-bold ${
            mode === "venting"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Emotional Garden
        </h2>

        <p
          className={`text-xl mt-2 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Your emotions nurture your personal growth
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div
          className={`p-10 rounded-3xl shadow text-center ${
            mode === "venting"
              ? "bg-slate-700"
              : "bg-white"
          }`}
        >
          <div className="text-6xl">🌱</div>

          <h3
            className={`text-2xl font-semibold mt-4 ${
              mode === "venting"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Seedling
          </h3>

          <p
            className={`mt-2 ${
              mode === "venting"
                ? "text-slate-300"
                : "text-slate-500"
            }`}
          >
            Started emotional journaling
          </p>
        </div>

        <div
          className={`p-10 rounded-3xl shadow text-center ${
            mode === "venting"
              ? "bg-slate-700"
              : "bg-white"
          }`}
        >
          <div className="text-6xl">🌷</div>

          <h3
            className={`text-2xl font-semibold mt-4 ${
              mode === "venting"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Blooming
          </h3>

          <p
            className={`mt-2 ${
              mode === "venting"
                ? "text-slate-300"
                : "text-slate-500"
            }`}
          >
            7 positive reflections completed
          </p>
        </div>

        <div
          className={`p-10 rounded-3xl shadow text-center ${
            mode === "venting"
              ? "bg-slate-700"
              : "bg-white"
          }`}
        >
          <div className="text-6xl">🌳</div>

          <h3
            className={`text-2xl font-semibold mt-4 ${
              mode === "venting"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Growth Tree
          </h3>

          <p
            className={`mt-2 ${
              mode === "venting"
                ? "text-slate-300"
                : "text-slate-500"
            }`}
          >
            Strong emotional resilience
          </p>
        </div>

      </div>

    </section>
  );
}