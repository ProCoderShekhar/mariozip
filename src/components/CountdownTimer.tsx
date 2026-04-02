import { useState, useEffect } from 'react';


interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();

            // Target: April 30, 2026 at 23:59:59
            // Month is 0-indexed, so April is 3
            const endDate = new Date(2026, 3, 30, 23, 59, 59);

            const difference = endDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tabular-nums tracking-tight drop-shadow-sm">
                {value.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs font-medium text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/40 uppercase tracking-widest mt-2">
                {label}
            </div>
        </div>
    );

    const Separator = () => (
        <div className="text-3xl md:text-5xl font-light text-white/10 -mt-6">:</div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto mb-20 animate-fade-in-up delay-300">
            <div className="p-6 md:p-8 flex flex-col items-center justify-center relative">

                <div className="text-sm font-normal text-white/40 uppercase tracking-[0.2em] mb-6 relative z-10 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                    Leaderboard Ends In
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                </div>

                <div className="flex items-center justify-center relative z-10">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <Separator />
                    <TimeUnit value={timeLeft.hours} label="Hrs" />
                    <Separator />
                    <TimeUnit value={timeLeft.minutes} label="Min" />
                    <Separator />
                    <TimeUnit value={timeLeft.seconds} label="Sec" />
                </div>
            </div>
        </div>
    );
}
