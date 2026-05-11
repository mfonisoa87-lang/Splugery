import { useState } from 'react';
import { Users, Plus, Lock, Globe, Calendar, Target, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { squads } from '../data/mockData';

function SquadCard({ squad, joined = false }: { squad: (typeof squads)[0]; joined?: boolean }) {
  const pct = Math.round((squad.saved / squad.goal) * 100);
  const spotsLeft = squad.maxMembers - squad.members;
  const deadlineDate = new Date(squad.deadline);
  const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white dark:bg-brand-dark-card rounded-3xl overflow-hidden card-shadow dark:card-shadow-dark">
      {/* Header gradient */}
      <div className={`bg-gradient-to-br ${squad.coverColor} p-5 relative`}>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            spotsLeft > 0
              ? 'bg-white/20 text-white'
              : 'bg-white/10 text-white/60'
          }`}>
            {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {squad.avatars.map((a, i) => (
            <img key={i} src={a} alt="" className="w-8 h-8 rounded-full border-2 border-white/30 -ml-2 first:ml-0 object-cover" />
          ))}
          <span className="text-white/70 text-xs ml-1">{squad.members} members</span>
        </div>

        <h3 className="font-display font-bold text-white text-lg leading-snug mb-1">{squad.name}</h3>
        <p className="text-white/60 text-sm line-clamp-2">{squad.description}</p>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">Saved</p>
              <p className="font-display font-bold text-brand-violet dark:text-brand-violet-light">
                ₦{squad.saved.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">Goal</p>
              <p className="font-display font-bold text-neutral-700 dark:text-neutral-300">
                ₦{squad.goal.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">Progress</p>
              <p className="font-display font-bold text-2xl gradient-text">{pct}%</p>
            </div>
          </div>
          <div className="h-2.5 rounded-full bg-neutral-100 dark:bg-brand-dark-border overflow-hidden">
            <div
              className="h-full rounded-full gradient-brand transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{daysLeft} days left</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <Target className="w-3.5 h-3.5" />
            <span>{squad.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <Users className="w-3.5 h-3.5" />
            <span>{squad.members}/{squad.maxMembers}</span>
          </div>
        </div>

        <button className={`w-full py-3 rounded-2xl font-display font-semibold text-sm transition-all active:scale-95 ${
          joined
            ? 'bg-neutral-100 dark:bg-brand-dark-border text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-brand-dark-border/70'
            : spotsLeft > 0
            ? 'gradient-brand text-white hover:opacity-90'
            : 'bg-neutral-100 dark:bg-brand-dark-border text-neutral-400 cursor-not-allowed'
        }`}>
          {joined ? '✓ Joined — View Squad' : spotsLeft > 0 ? 'Join Squad' : 'Squad Full'}
        </button>
      </div>
    </div>
  );
}

function CreateSquadCTA() {
  return (
    <div className="rounded-3xl border-2 border-dashed border-brand-violet/30 dark:border-brand-violet/20 p-6 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mb-3 animate-bounce-soft">
        <Plus className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-display font-bold text-base text-neutral-800 dark:text-white mb-1">
        Start Your Own Squad
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        Invite your crew, set a goal, and save together toward your dream wardrobe.
      </p>
      <button className="btn-primary text-sm py-2.5 px-6">
        Create Style Squad
      </button>
    </div>
  );
}

export default function StyleSquads() {
  const [activeTab, setActiveTab] = useState<'my' | 'discover'>('my');

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-brand-dark pb-24">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-4 pt-5">
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-brand-violet" />
            <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white">
              Style Squads
            </h1>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Save collectively. Shop smarter. Reach goals together.
          </p>
        </div>

        {/* My stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Active Squads', value: '3', emoji: '👥' },
            { label: 'Total Saved', value: '₦375k', emoji: '💰' },
            { label: 'Goals Hit', value: '2', emoji: '🎯' },
          ].map(({ label, value, emoji }) => (
            <div key={label} className="bg-white dark:bg-brand-dark-card rounded-2xl p-3 text-center card-shadow dark:card-shadow-dark">
              <p className="text-xl mb-0.5">{emoji}</p>
              <p className="font-display font-bold text-base gradient-text">{value}</p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 dark:bg-brand-dark-card rounded-2xl p-1 mb-5">
          {(['my', 'discover'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-brand-dark-border text-brand-violet dark:text-brand-violet-light shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              {tab === 'my' ? '👤 My Squads' : '🔍 Discover'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'my' ? (
            <>
              <SquadCard squad={squads[0]} joined />
              <SquadCard squad={squads[2]} joined />
              <CreateSquadCTA />
            </>
          ) : (
            <>
              {/* Promo banner */}
              <div className="rounded-3xl gradient-brand p-4 flex items-center gap-3 text-white">
                <Sparkles className="w-8 h-8 flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-sm">New squads every week!</p>
                  <p className="text-white/70 text-xs">Join a squad and start saving toward your fashion goals.</p>
                </div>
              </div>

              {/* Privacy filter */}
              <div className="flex gap-2">
                {[
                  { icon: Globe, label: 'Open' },
                  { icon: Lock, label: 'Invite Only' },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-brand-dark-card text-sm text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-brand-dark-border hover:border-brand-violet/40 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {squads.map(s => (
                <SquadCard key={s.id} squad={s} />
              ))}
              <CreateSquadCTA />
            </>
          )}
        </div>

        {/* How it works */}
        <div className="mt-6 bg-white dark:bg-brand-dark-card rounded-3xl p-5 card-shadow dark:card-shadow-dark">
          <h3 className="font-display font-bold text-base text-neutral-800 dark:text-white mb-4">
            How Style Squads Work
          </h3>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Form your squad', desc: 'Create or join a savings group of up to 25 fashion lovers.' },
              { step: '2', title: 'Set a fashion goal', desc: 'Agree on a target amount and deadline — events, drops, or wardrobes.' },
              { step: '3', title: 'Save together', desc: 'Everyone contributes regularly. Watch your goal come to life.' },
              { step: '4', title: 'Shop & celebrate', desc: 'Hit your target and shop at community-negotiated prices.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3">
                <div className="w-7 h-7 rounded-full gradient-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step}
                </div>
                <div>
                  <p className="font-semibold text-sm text-neutral-800 dark:text-white">{title}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
