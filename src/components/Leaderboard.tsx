import { useEffect, useState } from 'react';
import { fetchLeaderboard, type LeaderboardEntry } from '../services/api';
import { Medal, Loader2, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { TiltCard } from './ui/TiltCard';
import { CountdownTimer } from './CountdownTimer';

export function Leaderboard() {
    const [data, setData] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard().then(data => {
            setData(data);
            setLoading(false);
        });
    }, []);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Medal className="w-6 h-6 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
        if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
        return <span className="text-white/50 w-6 text-center font-mono">{rank}</span>;
    };

    const getPrize = (rank: number) => {
        if (rank === 1) return "$400.00";
        if (rank === 2) return "$200.00";
        if (rank === 3) return "$150.00";
        if (rank === 4) return "$100.00";
        if (rank === 5) return "$50.00";
        if (rank === 6) return "$40.00";
        if (rank >= 7 && rank <= 8) return "$20.00";
        if (rank >= 9 && rank <= 10) return "$10.00";
        return "-";
    };

    const top3 = data.slice(0, 3);
    const rest = data.slice(3);

    return (
        <div id="leaderboard" className="py-20">
            <div className="container mx-auto px-4">

                {/* Podium Section */}
                {!loading && top3.length > 0 && (
                    <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-20 max-w-6xl mx-auto px-4 animate-fade-in-up delay-300">
                        {/* 2nd Place */}
                        {top3[1] && (
                            <TiltCard className="order-2 md:order-1 flex-1 w-full max-w-[280px]">
                                <div className="w-full bg-[#1a1a1f]/80 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center relative shadow-[0_8px_32px_rgba(0,0,0,0.3)] mt-8 md:mt-0 min-h-[400px] justify-end group overflow-hidden border border-transparent hover:border-slate-400/30 transition-colors duration-300">
                                    {/* Fading Parabolic Border */}
                                    <div className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                                        style={{
                                            boxShadow: 'inset 0 3px 0 0 rgba(148, 163, 184, 0.5)',
                                            background: 'linear-gradient(to bottom, rgba(148, 163, 184, 0.3) 0%, rgba(148, 163, 184, 0.1) 40%, transparent 65%)',
                                            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 65%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 65%)',
                                            padding: '3px'
                                        }}>
                                        <div className="absolute top-0 left-0 w-[3px] h-[65%] bg-gradient-to-b from-slate-400/50 to-transparent"></div>
                                        <div className="absolute top-0 right-0 w-[3px] h-[65%] bg-gradient-to-b from-slate-400/50 to-transparent"></div>
                                    </div>

                                    {/* Pencil Tip Rank Indicator */}
                                    <div className="absolute -top-[2px] right-8 z-20">
                                        <div className="bg-slate-300 text-slate-900 font-black w-8 pb-3 pt-5 flex flex-col items-center leading-none shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}>
                                            <span className="text-sm">2ND</span>
                                        </div>
                                    </div>

                                    <div className="w-32 h-32 rounded-full border border-slate-400/30 bg-[#15151a] p-1 mb-8 flex items-center justify-center relative shadow-[0_0_30px_rgba(203,213,225,0.1)] z-10">
                                        <User className="w-14 h-14 text-slate-400" />
                                    </div>

                                    <div className="text-3xl font-bold text-slate-200 mb-8 tracking-tight z-10">{getPrize(2)}</div>

                                    <div className="w-12 h-px bg-slate-500/30 mb-8 z-10"></div>

                                    <div className="text-[10px] font-bold text-white/30 mb-2 z-10">{top3[1].username}</div>
                                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mb-1 z-10">Weighted Wager</div>
                                    <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-wide z-10">${top3[1].wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                            </TiltCard>
                        )}

                        {/* 1st Place */}
                        {top3[0] && (
                            <TiltCard className="order-1 md:order-2 flex-1 w-full max-w-[320px] scale-105 z-10" scale={1.1}>
                                <div className="w-full bg-[#1a1a1f]/90 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center relative shadow-[0_0_50px_rgba(234,179,8,0.15)] min-h-[460px] justify-end group overflow-hidden border border-transparent hover:border-yellow-500/50 transition-colors duration-300">
                                    {/* Fading Parabolic Border */}
                                    <div className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                                        style={{
                                            boxShadow: 'inset 0 3px 0 0 rgba(234, 179, 8, 0.6)',
                                            background: 'linear-gradient(to bottom, rgba(234, 179, 8, 0.3) 0%, rgba(234, 179, 8, 0.1) 40%, transparent 65%)',
                                            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 65%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 65%)'
                                        }}>
                                        <div className="absolute top-0 left-0 w-[3px] h-[65%] bg-gradient-to-b from-yellow-500/60 to-transparent"></div>
                                        <div className="absolute top-0 right-0 w-[3px] h-[65%] bg-gradient-to-b from-yellow-500/60 to-transparent"></div>
                                    </div>

                                    {/* Pencil Tip Rank Indicator */}
                                    <div className="absolute -top-[2px] right-10 z-20">
                                        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-black font-black w-10 pb-4 pt-6 flex flex-col items-center leading-none shadow-xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}>
                                            <span className="text-base">1ST</span>
                                        </div>
                                    </div>

                                    <div className="w-40 h-40 rounded-full border border-yellow-500/40 bg-[#15151a] p-1 mb-10 flex items-center justify-center relative shadow-[0_0_40px_rgba(234,179,8,0.2)] z-10">
                                        <User className="w-20 h-20 text-yellow-500" />
                                    </div>

                                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 mb-10 tracking-tight z-10">{getPrize(1)}</div>

                                    <div className="w-16 h-px bg-yellow-500/30 mb-8 z-10"></div>

                                    <div className="text-xs font-bold text-white/40 mb-2 z-10">{top3[0].username}</div>
                                    <div className="text-[10px] text-yellow-500/40 font-medium uppercase tracking-widest mb-1 z-10">Weighted Wager</div>
                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-wide z-10">${top3[0].wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                            </TiltCard>
                        )}

                        {/* 3rd Place */}
                        {top3[2] && (
                            <TiltCard className="order-3 md:order-3 flex-1 w-full max-w-[280px]">
                                <div className="w-full bg-[#1a1a1f]/80 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center relative shadow-[0_8px_32px_rgba(0,0,0,0.3)] mt-8 md:mt-0 min-h-[400px] justify-end group overflow-hidden border border-transparent hover:border-amber-700/30 transition-colors duration-300">
                                    {/* Fading Parabolic Border */}
                                    <div className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                                        style={{
                                            boxShadow: 'inset 0 3px 0 0 rgba(180, 83, 9, 0.5)',
                                            background: 'linear-gradient(to bottom, rgba(180, 83, 9, 0.3) 0%, rgba(180, 83, 9, 0.1) 40%, transparent 65%)',
                                            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 65%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 65%)'
                                        }}>
                                        <div className="absolute top-0 left-0 w-[3px] h-[65%] bg-gradient-to-b from-amber-700/50 to-transparent"></div>
                                        <div className="absolute top-0 right-0 w-[3px] h-[65%] bg-gradient-to-b from-amber-700/50 to-transparent"></div>
                                    </div>

                                    {/* Pencil Tip Rank Indicator */}
                                    <div className="absolute -top-[2px] left-8 z-20">
                                        <div className="bg-amber-700 text-amber-100 font-black w-8 pb-3 pt-5 flex flex-col items-center leading-none shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}>
                                            <span className="text-sm">3RD</span>
                                        </div>
                                    </div>

                                    <div className="w-32 h-32 rounded-full border border-amber-700/30 bg-[#15151a] p-1 mb-8 flex items-center justify-center relative shadow-[0_0_30px_rgba(180,83,9,0.1)] z-10">
                                        <User className="w-14 h-14 text-amber-700" />
                                    </div>

                                    <div className="text-3xl font-bold text-amber-700 mb-8 tracking-tight z-10">{getPrize(3)}</div>

                                    <div className="w-12 h-px bg-amber-700/30 mb-8 z-10"></div>

                                    <div className="text-[10px] font-bold text-white/30 mb-2 z-10">{top3[2].username}</div>
                                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mb-1 z-10">Weighted Wager</div>
                                    <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-wide z-10">${top3[2].wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                            </TiltCard>
                        )}
                    </div>
                )}

                <CountdownTimer />

                <div className="bg-[#1a1a1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto animate-fade-in-up delay-500">


                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black/20 text-white/40 text-sm uppercase tracking-wider">
                                    <th className="p-4 pl-6 font-medium">Rank</th>
                                    <th className="p-4 font-medium">Player</th>
                                    <th className="p-4 text-right font-medium">Weighted Wager</th>
                                    <th className="p-4 pr-6 text-right font-medium text-white/90">Prize</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center">
                                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-yellow-500/50" />
                                        </td>
                                    </tr>
                                ) : (
                                    rest.map((entry, index) => {
                                        const rank = index + 4;
                                        return (
                                            <tr
                                                key={index}
                                                className="transition-colors hover:bg-white/5 group"
                                            >
                                                <td className="p-4 pl-6 font-bold flex items-center gap-3">
                                                    {getRankIcon(rank)}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:bg-yellow-500/20 group-hover:text-yellow-500 transition-colors">
                                                            <User size={14} />
                                                        </div>
                                                        <span className={cn(
                                                            "font-medium",
                                                            rank === 1 ? "text-yellow-500 font-bold" : "text-white/90"
                                                        )}>
                                                            {entry.username}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right font-mono text-white/70">
                                                    ${entry.wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className="p-4 pr-6 text-right font-mono font-bold">
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                                                        {getPrize(rank)}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 text-center text-xs text-white/30 border-t border-white/5">
                        Leaderboard updates every 15 minutes
                    </div>
                </div>
            </div>
        </div>
    );
}
