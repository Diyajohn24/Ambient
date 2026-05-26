type InsightsProps = {
  mode: string;
};

export default function Insights({
  mode,
}: InsightsProps) {
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
          Emotional Insights
        </h2>

        <p
          className={`text-xl mt-2 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Patterns discovered from your recent activity
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div
          className={`rounded-3xl p-8 shadow ${
            mode === "venting"
              ? "bg-slate-700"
              : "bg-white"
          }`}
        >
          <h3
            className={`text-2xl font-semibold ${
              mode === "venting"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Most Frequent Mood
          </h3>

          <p className="text-4xl text-[#7C3AED] font-bold mt-4">
            Calm
          </p>
        </div>

        <div
          className={`rounded-3xl p-8 shadow ${
            mode === "venting"
              ? "bg-slate-700"
              : "bg-white"
          }`}
        >
          <h3
            className={`text-2xl font-semibold ${
              mode === "venting"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Positive Days
          </h3>

          <p className="text-4xl text-[#7C3AED] font-bold mt-4">
            21
          </p>
        </div>

        <div
          className={`rounded-3xl p-8 shadow ${
            mode === "venting"
              ? "bg-slate-700"
              : "bg-white"
          }`}
        >
          <h3
            className={`text-2xl font-semibold ${
              mode === "venting"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Reflection Streak
          </h3>

          <p className="text-4xl text-[#7C3AED] font-bold mt-4">
            8 Days
          </p>
        </div>

      </div>

      <div
        className={`rounded-3xl p-8 shadow ${
          mode === "venting"
            ? "bg-slate-700"
            : "bg-white"
        }`}
      >
        <h3
          className={`text-2xl font-semibold ${
            mode === "venting"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          AI Observation
        </h3>

        <p
          className={`text-lg mt-4 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-700"
          }`}
        >
          You appear most relaxed after outdoor activities and meaningful conversations.
        </p>
      </div>

    </section>
  );
}