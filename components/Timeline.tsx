type TimelineProps = {
  mode: string;
};

export default function Timeline({
  mode,
}: TimelineProps) {
  return (
    <section className="space-y-6">

      <div>
        <h2
          className={`text-5xl font-bold ${
            mode === "venting"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Emotional Timeline
        </h2>

        <p
          className={`text-xl mt-2 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Your recent emotional journey
        </p>
      </div>

      <div
        className={`p-8 rounded-3xl shadow ${
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
          Calm
        </h3>

        <p
          className={`mt-1 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-500"
          }`}
        >
          Today • 2:30 PM
        </p>

        <p
          className={`text-lg mt-4 ${
            mode === "venting"
              ? "text-slate-100"
              : "text-slate-700"
          }`}
        >
          Feeling peaceful after a walk in the park.
        </p>
      </div>

      <div
        className={`p-8 rounded-3xl shadow ${
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
          Joy
        </h3>

        <p
          className={`mt-1 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-500"
          }`}
        >
          Today • 10:15 AM
        </p>

        <p
          className={`text-lg mt-4 ${
            mode === "venting"
              ? "text-slate-100"
              : "text-slate-700"
          }`}
        >
          Had a wonderful conversation with a friend.
        </p>
      </div>

      <div
        className={`p-8 rounded-3xl shadow ${
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
          Motivation
        </h3>

        <p
          className={`mt-1 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-500"
          }`}
        >
          Yesterday • 8:00 PM
        </p>

        <p
          className={`text-lg mt-4 ${
            mode === "venting"
              ? "text-slate-100"
              : "text-slate-700"
          }`}
        >
          Planned goals for the upcoming week.
        </p>
      </div>

    </section>
  );
}