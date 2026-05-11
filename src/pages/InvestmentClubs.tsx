import { useState } from 'react';
import { TrendingUp, MapPin, ChevronRight, Info, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { investmentClubs } from '../data/mockData';
import type { InvestmentClub } from '../data/mockData';

function InvestmentCard({ club }: { club: InvestmentClub }) {
  const [invested, setInvested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const pct = Math.round((club.raised / club.target) * 100);
  const deadlineDate = new Date(club.deadline);
  const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isAlmostFull = pct >= 90;

  return (
    <>
      <div className="bg-white dark:bg-brand-dark-card rounded-3xl overflow-hidden card-shadow dark:card-shadow-dark">
        {/* Cover */}
        <div className={`bg-gradient-to-br ${club.coverColor} p-5 relative`}>
          {isAlmostFull && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              <Zap className="w-3 h-3" /> Almost Full!
            </div>
          )}
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden flex-shrink-0">
              <img src={club.logo} alt={club.brand} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-extrabold text-xl text-white leading-tight">{club.brand}</h3>
              <p className="text-white/70 text-sm mt-0.5 line-clamp-2">{club.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-3">
            <MapPin className="w-3.5 h-3.5 text-white/60" />
            <span className="text-white/60 text-xs">{club.origin}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {club.tags.map(tag => (
              <span key={tag} className="glass-card text-white/90 text-xs px-2.5 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <p className="font-display font-bold text-lg gradient-text">{club.projectedROI}</p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Projected ROI</p>
            </div>
            <div className="text-center border-x border-neutral-100 dark:border-brand-dark-border">
              <p className="font-display font-bold text-lg text-neutral-800 dark:text-white">
                {club.investors.toLocaleString()}
              </p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Investors</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-lg text-neutral-800 dark:text-white">
                {daysLeft}d
              </p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Days left</p>
            </div>
          </div>

          {/* Funding progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                ₦{(club.raised / 1000000).toFixed(1)}M raised
              </span>
              <span className="text-xs font-bold text-brand-violet dark:text-brand-violet-light">
                {pct}% of ₦{(club.target / 1000000).toFixed(0)}M
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-neutral-100 dark:bg-brand-dark-border overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isAlmostFull ? 'bg-gradient-to-r from-brand-coral to-red-500' : 'gradient-brand'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Min investment */}
          <div className="flex items-center justify-between mb-4 bg-brand-violet/5 dark:bg-brand-violet/10 rounded-xl p-3">
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Minimum investment</p>
              <p className="font-display font-bold text-brand-violet dark:text-brand-violet-light">
                ₦{club.minInvestment.toLocaleString()}
              </p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-brand-violet/10 transition-colors">
              <Info className="w-4 h-4 text-brand-violet/60" />
            </button>
          </div>

          {/* CTA */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 gradient-brand text-white font-display font-semibold rounded-2xl py-3 hover:opacity-90 active:scale-95 transition-all text-sm"
            >
              {invested ? '+ Add More' : 'Invest Now'}
            </button>
            <button className="p-3 rounded-2xl bg-neutral-100 dark:bg-brand-dark-border hover:bg-neutral-200 dark:hover:bg-brand-dark-border/70 transition-colors">
              <ChevronRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>

          {invested && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-medium">
              <span>✓</span> You're invested! Portfolio: ₦{club.minInvestment.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Invest modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-brand-dark-card rounded-t-3xl p-6 animate-slide-up">
            <div className="w-12 h-1.5 bg-neutral-200 dark:bg-brand-dark-border rounded-full mx-auto mb-5" />
            <h3 className="font-display font-extrabold text-xl text-neutral-900 dark:text-white mb-1">
              Invest in {club.brand}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">{club.tagline}</p>

            <div className="bg-neutral-50 dark:bg-brand-dark-border/50 rounded-2xl p-4 mb-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-500 dark:text-neutral-400">Projected ROI</span>
                <span className="font-bold gradient-text">{club.projectedROI}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-500 dark:text-neutral-400">Minimum</span>
                <span className="font-semibold text-neutral-800 dark:text-white">₦{club.minInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">Closes in</span>
                <span className="font-semibold text-brand-coral">{daysLeft} days</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">
                Investment Amount (₦)
              </label>
              <input
                type="number"
                defaultValue={club.minInvestment}
                min={club.minInvestment}
                className="w-full bg-neutral-100 dark:bg-brand-dark-border rounded-xl px-4 py-3 font-display font-bold text-lg text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-violet/40"
              />
            </div>

            <button
              onClick={() => { setInvested(true); setShowModal(false); }}
              className="w-full gradient-brand text-white font-display font-bold rounded-2xl py-4 hover:opacity-90 active:scale-95 transition-all"
            >
              Confirm Investment 🚀
            </button>
            <p className="text-xs text-neutral-400 text-center mt-3">
              Investments are secured and regulated. T&Cs apply.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default function InvestmentClubs() {
  const [activeTab, setActiveTab] = useState<'explore' | 'portfolio'>('explore');

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-brand-dark pb-24">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-4 pt-5">
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-brand-violet" />
            <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white">
              Investment Clubs
            </h1>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Pool funds. Back African brands. Earn returns.
          </p>
        </div>

        {/* Portfolio snapshot */}
        <div className="rounded-3xl gradient-brand p-5 text-white mb-5 relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute right-10 bottom-[-16px] w-20 h-20 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-white/70 text-xs font-medium mb-1">My Portfolio Value</p>
            <p className="font-display font-extrabold text-3xl mb-3">₦35,000</p>
            <div className="flex gap-4">
              <div>
                <p className="text-white/60 text-xs">Invested in</p>
                <p className="font-bold text-sm">2 brands</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Avg. ROI</p>
                <p className="font-bold text-sm">+28% /yr</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Total Return</p>
                <p className="font-bold text-sm text-brand-gold-light">+₦7,200</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 dark:bg-brand-dark-card rounded-2xl p-1 mb-5">
          {(['explore', 'portfolio'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-brand-dark-border text-brand-violet dark:text-brand-violet-light shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              {tab === 'explore' ? '🔍 Explore' : '💼 My Portfolio'}
            </button>
          ))}
        </div>

        {/* How it works ribbon */}
        {activeTab === 'explore' && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-5 pb-1">
            {[
              { emoji: '🔍', text: 'Pick a brand' },
              { emoji: '💸', text: 'Invest as little as ₦1k' },
              { emoji: '📈', text: 'Track returns' },
              { emoji: '🎉', text: 'Get paid out' },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex-shrink-0 flex items-center gap-2 bg-white dark:bg-brand-dark-card rounded-xl px-3 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 card-shadow dark:card-shadow-dark">
                <span className="text-base">{emoji}</span>
                {text}
              </div>
            ))}
          </div>
        )}

        {/* Club cards */}
        <div className="space-y-4">
          {activeTab === 'explore' ? (
            investmentClubs.map(club => (
              <InvestmentCard key={club.id} club={club} />
            ))
          ) : (
            <>
              <div className="text-center py-8 bg-white dark:bg-brand-dark-card rounded-3xl card-shadow dark:card-shadow-dark">
                <p className="text-3xl mb-2">📊</p>
                <p className="font-display font-bold text-neutral-700 dark:text-neutral-300">Portfolio coming soon</p>
                <p className="text-sm text-neutral-400 mt-1">Make your first investment to see your portfolio</p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="mt-4 btn-primary text-sm py-2 px-5"
                >
                  Explore Brands
                </button>
              </div>
            </>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-neutral-400 text-center mt-6 leading-relaxed px-4">
          Fashion investments carry risk. Past performance doesn't guarantee future returns. Splugery is not a licensed financial advisor.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
