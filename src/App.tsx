import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Leaderboard } from './components/Leaderboard';

import { InfoSection } from './components/InfoSection';
import { Calendar, Gamepad2, Trophy, ShieldAlert, BadgeDollarSign, Twitter, Instagram } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-red-500/30">
      <Header />

      <main>
        <Hero />

        <Leaderboard />




        <div className="pb-20 px-4 max-w-5xl mx-auto animate-fade-in-up delay-700">
          <div className="bg-[#1a1a1f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">

            {/* Decorative Red Shade/Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

            <div className="divide-y divide-white/5 relative z-10">
              <InfoSection title="Competition Period" icon={<Calendar className="w-6 h-6" />} className="pt-0">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Monthly competitions run from the 1st of each month to the 30th of the following month</li>
                  <li>Current competition: <span className="text-red-500 font-semibold">February 01, 2025 - February 28, 2026</span></li>
                  <li>Leaderboard resets automatically at the start of each new competition</li>
                  <li>Winners are announced within 48 hours of competition end</li>
                </ul>
              </InfoSection>

              <InfoSection title="Eligible Games & Weighted Wagering" icon={<Gamepad2 className="w-6 h-6" />}>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Slot & House Games Only:</strong> Only wagers on slots and house games count towards the leaderboard (Dice is excluded)</li>
                  <li><strong>RTP ≤ 97%:</strong> 100% weight (full wager amount counts)</li>
                  <li><strong>RTP 97.01% - 97.99%:</strong> 50% weight (half wager amount counts)</li>
                  <li><strong>RTP ≥ 98%:</strong> 10% weight (only 10% of wager amount counts)</li>
                  <li>Sports betting, live casino, and table games are excluded</li>
                  <li>Weighted wagering prevents abuse of high-RTP games</li>
                </ul>
              </InfoSection>

              <InfoSection title="Prize Structure" icon={<Trophy className="w-6 h-6" />} id="prizes">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-yellow-500/20 cursor-default">
                    <div className="text-2xl font-bold text-yellow-500">$400</div>
                    <div className="text-xs uppercase tracking-wider opacity-60">1st Place</div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-white/10 cursor-default">
                    <div className="text-2xl font-bold text-stone-300">$200</div>
                    <div className="text-xs uppercase tracking-wider opacity-60">2nd Place</div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-white/10 cursor-default">
                    <div className="text-2xl font-bold text-amber-700">$150</div>
                    <div className="text-xs uppercase tracking-wider opacity-60">3rd Place</div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-white/10 cursor-default">
                    <div className="text-2xl font-bold text-white">$1,000</div>
                    <div className="text-xs uppercase tracking-wider opacity-60">Total Pool</div>
                  </div>
                </div>
                <p className="text-sm opacity-60 text-center">
                  4th: $100 • 5th: $50 • 6th: $40 • 7th-8th: $20 each • 9th-10th: $10 each
                </p>
              </InfoSection>

              <InfoSection title="Rules & Fair Play" icon={<ShieldAlert className="w-6 h-6" />} id="rules">
                <ul className="list-disc pl-5 space-y-2">
                  <li>One account per person - multi-accounting will result in disqualification</li>
                  <li>Minimum total wager of $1000 required to qualify for prizes</li>
                  <li>All wagering must be done through the <span className="text-red-500">MarioZip referral link</span></li>
                  <li>Bonuses and promotional funds count toward wagering requirements</li>
                  <li>Disputes must be submitted within 7 days of competition end</li>
                  <li>MarioZip reserves the right to verify all wagering activity</li>
                  <li>Winners must respond within 14 days to claim prizes</li>
                </ul>
              </InfoSection>

              <InfoSection title="Prize Distribution" icon={<BadgeDollarSign className="w-6 h-6" />} className="pb-0">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Prizes are distributed in cryptocurrency</li>
                  <li>Winners will be contacted via their registered Roobet email</li>
                  <li>Prize distribution typically occurs within 72 hours of verification</li>
                  <li>Minimum withdrawal amount may apply based on network fees</li>
                  <li>Tax responsibilities lie with the individual winner</li>
                </ul>
              </InfoSection>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-white/5">
        <div className="flex items-center gap-6 justify-center">
          {/* Kick */}
          <a href="https://kick.com/mariozip7" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#53FC18] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M2.833 2.125h3.5v7.625h.458L12.5 2.125H17l-5.625 7.417L17.5 19.875h-4.292l-5.333-7.583h-.542v7.583h-4.5V2.125z" />
            </svg>
          </a>
          {/* X */}
          <a href="https://x.com/mariozip7?s=21" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/mariozip7?igsh=aGVvbHoxbnphamxo&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#E1306C] transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
