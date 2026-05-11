import { TrendingUp, Users, Wallet, ArrowRight, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { products, squads } from '../data/mockData';

const FEATURED_PRODUCTS = products.slice(0, 4);
const TRENDING_PRODUCTS = products.slice(2, 6);

function StatCard({
  icon,
  label,
  value,
  sub,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  gradient: string;
}) {
  return (
    <div className={`rounded-2xl p-4 text-white ${gradient} flex-shrink-0 w-36`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/70 text-xs font-medium">{label}</span>
        <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">{icon}</div>
      </div>
      <p className="font-display font-bold text-xl leading-none">{value}</p>
      {sub && <p className="text-white/60 text-xs mt-1">{sub}</p>}
    </div>
  );
}

function SquadMiniCard({ squad }: { squad: (typeof squads)[0] }) {
  const navigate = useNavigate();
  const pct = Math.round((squad.saved / squad.goal) * 100);

  return (
    <button
      onClick={() => navigate('/squads')}
      className={`flex-shrink-0 w-56 rounded-2xl bg-gradient-to-br ${squad.coverColor} p-4 text-white text-left hover:scale-[1.02] active:scale-95 transition-all`}
    >
      <div className="flex items-center gap-1 mb-3">
        {squad.avatars.slice(0, 3).map((a, i) => (
          <img key={i} src={a} alt="" className="w-7 h-7 rounded-full border-2 border-white/30 -ml-2 first:ml-0 object-cover" />
        ))}
        <span className="text-white/70 text-xs ml-1">+{squad.members - 3} more</span>
      </div>
      <h3 className="font-display font-bold text-sm leading-snug mb-2 line-clamp-2">{squad.name}</h3>
      <div className="w-full h-1.5 rounded-full bg-white/20 mb-1">
        <div
          className="h-full rounded-full bg-white/80 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-white/70 text-xs">₦{(squad.saved / 1000).toFixed(0)}k saved</span>
        <span className="text-xs font-bold">{pct}%</span>
      </div>
    </button>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-brand-dark pb-20">
      <Navbar />

      <main className="max-w-screen-xl mx-auto">
        {/* Hero greeting */}
        <section className="px-4 pt-5 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Good morning 👋</p>
              <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white mt-0.5">
                Amara Okafor
              </h1>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">Wallet Balance</p>
              <p className="font-display font-bold text-xl gradient-text">₦248,500</p>
            </div>
          </div>
        </section>

        {/* Stats row */}
        <section className="px-4 mb-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            <StatCard
              icon={<Wallet className="w-3.5 h-3.5 text-white" />}
              label="Savings"
              value="₦120k"
              sub="Across 3 squads"
              gradient="gradient-brand"
            />
            <StatCard
              icon={<Users className="w-3.5 h-3.5 text-white" />}
              label="Style Squads"
              value="3 Active"
              sub="12 members"
              gradient="bg-gradient-to-br from-brand-coral to-orange-600"
            />
            <StatCard
              icon={<TrendingUp className="w-3.5 h-3.5 text-white" />}
              label="Portfolio"
              value="₦35k"
              sub="+18% this month"
              gradient="gradient-gold"
            />
            <StatCard
              icon={<Crown className="w-3.5 h-3.5 text-white" />}
              label="Style Score"
              value="92 pts"
              sub="Top 5% seller"
              gradient="bg-gradient-to-br from-teal-500 to-emerald-700"
            />
          </div>
        </section>

        {/* Featured banner */}
        <section className="px-4 mb-6">
          <div className="relative rounded-3xl overflow-hidden gradient-brand h-44">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/banner/800/400')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <span className="pill bg-brand-gold/30 text-brand-gold-light border border-brand-gold/30 w-fit text-xs">
                ✨ TRENDING NOW
              </span>
              <div>
                <h2 className="font-display font-extrabold text-2xl text-white leading-tight mb-1">
                  Lagos Fashion<br />Week Drops 🔥
                </h2>
                <button
                  onClick={() => navigate('/marketplace')}
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute right-[-30px] top-[-30px] w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute right-10 bottom-[-20px] w-24 h-24 rounded-full bg-white/5" />
          </div>
        </section>

        {/* Quick actions */}
        <section className="px-4 mb-6">
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: '🛍️', label: 'Shop', path: '/marketplace' },
              { emoji: '👥', label: 'Squads', path: '/squads' },
              { emoji: '📈', label: 'Invest', path: '/invest' },
              { emoji: '♻️', label: 'Thrift', path: '/marketplace' },
            ].map(({ emoji, label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="bg-white dark:bg-brand-dark-card rounded-2xl p-3 flex flex-col items-center gap-1.5 card-shadow dark:card-shadow-dark hover:scale-105 active:scale-95 transition-all"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Trending products */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-coral" />
              <h2 className="font-display font-bold text-base text-neutral-900 dark:text-white">
                Trending Now
              </h2>
            </div>
            <button
              onClick={() => navigate('/marketplace')}
              className="text-sm text-brand-violet dark:text-brand-violet-light font-semibold flex items-center gap-0.5"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
            {TRENDING_PRODUCTS.map(p => (
              <div key={p.id} className="flex-shrink-0 w-40">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        {/* Style Squads preview */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-violet" />
              <h2 className="font-display font-bold text-base text-neutral-900 dark:text-white">
                Active Style Squads
              </h2>
            </div>
            <button
              onClick={() => navigate('/squads')}
              className="text-sm text-brand-violet dark:text-brand-violet-light font-semibold flex items-center gap-0.5"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
            {squads.map(s => (
              <SquadMiniCard key={s.id} squad={s} />
            ))}
          </div>
        </section>

        {/* Featured listings */}
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-base text-neutral-900 dark:text-white">
              Fresh Listings
            </h2>
            <button
              onClick={() => navigate('/marketplace')}
              className="text-sm text-brand-violet dark:text-brand-violet-light font-semibold flex items-center gap-0.5"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {FEATURED_PRODUCTS.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Investment CTA */}
        <section className="px-4 mb-6">
          <div className="rounded-3xl bg-gradient-to-br from-brand-dark-card to-brand-dark p-5 border border-brand-dark-border dark:border-brand-violet/20">
            <span className="pill-violet text-xs mb-3 inline-flex">💎 Investment Club</span>
            <h3 className="font-display font-bold text-lg text-white mb-1.5">
              Invest in the brands you love
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              Pool funds with your squad to invest in emerging African fashion brands. Minimum ₦1,000.
            </p>
            <button
              onClick={() => navigate('/invest')}
              className="w-full gradient-brand text-white font-display font-semibold rounded-2xl py-3 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
            >
              Explore Investment Clubs <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
