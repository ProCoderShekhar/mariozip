export function Header() {
    return (
        <header className="fixed top-0 left-0 z-50 w-full px-6 py-4 flex items-center justify-center gap-6 backdrop-blur-2xl bg-white/5 border-b border-white/5 shadow-2xl">
            {/* Logo Image */}
            <img
                src="/images/logo.webp"
                alt="MarioZip Logo"
                className="h-32 w-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-500 shrink-0 bg-white rounded-3xl p-2"
            />

            {/* Box 2: Text Pill */}
            <div className="bg-[#1a1a1f]/90 backdrop-blur-xl border border-red-600/30 rounded-full px-8 py-4 shadow-2xl flex items-center justify-center relative overflow-hidden min-w-[200px] transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 pointer-events-none" />
                <span className="text-3xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                    MARIOZIP
                </span>
            </div>
        </header>
    );
}
