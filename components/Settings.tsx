type SettingsProps = {
  mode: string;
};

export default function Settings({
  mode,
}: SettingsProps) {
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
          Settings
        </h2>

        <p
          className={`text-xl mt-2 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Customize your Ambient experience
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
          Theme
        </h3>

        <p
          className={`mt-3 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Soft Lavender
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
          Companion Personality
        </h3>

        <p
          className={`mt-3 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Supportive & Reflective
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
          Notifications
        </h3>

        <p
          className={`mt-3 ${
            mode === "venting"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Daily reflection reminders enabled
        </p>
      </div>

    </section>
  );
}