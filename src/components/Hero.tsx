import { Calendar } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative pt-64 pb-20 px-4 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto text-center relative z-10">
                <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tight flex flex-col items-center gap-2 animate-fade-in-up delay-100">
                    <span
                        className="text-white relative z-10 transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-default"
                        style={{
                            textShadow: '2px 2px 0px #e2e8f0, 4px 4px 0px #94a3b8, 8px 8px 0px #991b1b, 0px 0px 30px rgba(220, 38, 38, 0.8)',
                        }}
                    >
                        $1000 MONTHLY
                    </span>
                    <span
                        className="text-white relative z-10 transition-all duration-500 hover:scale-110 hover:-rotate-1 cursor-default"
                        style={{
                            textShadow: '2px 2px 0px #e2e8f0, 4px 4px 0px #94a3b8, 8px 8px 0px #991b1b, 0px 0px 30px rgba(220, 38, 38, 0.8)',
                        }}
                    >
                        LEADERBOARD
                    </span>
                </h1>

                <div className="flex justify-center mb-12 animate-fade-in-up delay-200">
                    <button 
                        onClick={() => {
                            const leaderboardSection = document.getElementById('leaderboard');
                            if (leaderboardSection) {
                                leaderboardSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 flex items-center gap-2 group"
                    >
                        <span>View Leaderboard</span>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="group-hover:translate-y-1 transition-transform"
                        >
                            <path d="M12 5v14M19 12l-7 7-7-7"/>
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <div className="flex items-center gap-2 text-sm md:text-base">
                            <span className="text-white/40">Competition Period:</span>
                            <span className="font-bold text-white">Mar 1 - Mar 31</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
