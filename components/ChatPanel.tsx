
type ChatPanelProps = {
    setShowChat: (value: boolean) => void;
};

export default function ChatPanel({
    setShowChat,
}: ChatPanelProps) {
    return (

        <section className="bg-white p-6 rounded-3xl shadow">

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Companion Chat
            </h2>

            <div className="bg-[#F4F0FF] p-4 rounded-2xl mb-4">
                How are you feeling today?
            </div>

            <input
                placeholder="Type your thoughts..."
                className="w-full p-4 rounded-2xl border text-black placeholder:text-slate-400"
            />
            <button
                onClick={() => setShowChat(false)}
                className="mb-4 px-4 py-2 bg-violet-600 text-black rounded-xl"
            >
                Close Chat
            </button>
        </section>
    );
}