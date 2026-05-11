import { useState } from 'react';
import {
  ShoppingBag,
  Tag,
  Sparkles,
  ArrowRight,
  Recycle,
  Star,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Role = 'buyer' | 'seller' | null;
type ItemType = 'thrift' | 'new' | 'both' | null;

const steps = ['welcome', 'role', 'itemtype', 'done'] as const;
type Step = (typeof steps)[number];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('welcome');
  const [role, setRole] = useState<Role>(null);
  const [itemType, setItemType] = useState<ItemType>(null);

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    if (r === 'seller') {
      setTimeout(() => setStep('done'), 300);
    } else {
      setTimeout(() => setStep('itemtype'), 300);
    }
  };

  const handleItemTypeSelect = (t: ItemType) => {
    setItemType(t);
    setTimeout(() => setStep('done'), 300);
  };

  const handleFinish = () => {
    localStorage.setItem('splugery-onboarded', 'true');
    localStorage.setItem('splugery-role', role ?? 'buyer');
    localStorage.setItem('splugery-item-type', itemType ?? 'both');
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-brand opacity-95" />
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/fashionbg/1200/800')] bg-cover bg-center opacity-10" />

      {/* Floating blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-white/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full bg-black/20 blur-3xl animate-pulse-slow" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Welcome step */}
        {step === 'welcome' && (
          <div className="text-center animate-slide-up max-w-sm w-full">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center animate-bounce-soft">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="font-display font-extrabold text-4xl text-white leading-tight mb-3">
              Welcome to<br />
              <span className="text-brand-gold-light">Splugery</span>
            </h1>
            <p className="text-white/80 text-base leading-relaxed mb-10">
              Where fashion meets finance. Save together, shop smarter, and invest in brands you love.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                { emoji: '👗', label: 'Style Squads' },
                { emoji: '📈', label: 'Invest' },
                { emoji: '🛍️', label: 'Marketplace' },
              ].map(({ emoji, label }) => (
                <div key={label} className="glass-card rounded-2xl p-3 flex flex-col items-center gap-1">
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-white/90 text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('role')}
              className="w-full bg-white text-brand-violet font-display font-bold text-lg rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 transition-all shadow-xl"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-white/50 text-xs mt-4">
              Already have an account?{' '}
              <button onClick={handleFinish} className="text-white/80 underline font-semibold">
                Sign in
              </button>
            </p>
          </div>
        )}

        {/* Role selection step */}
        {step === 'role' && (
          <div className="animate-slide-up max-w-sm w-full">
            <div className="text-center mb-8">
              <span className="pill bg-white/20 text-white text-sm mb-3">Step 1 of 2</span>
              <h2 className="font-display font-extrabold text-3xl text-white mt-3 mb-2">
                How are you here?
              </h2>
              <p className="text-white/70">
                Tell us how you plan to use Splugery
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect('buyer')}
                className={`w-full glass-card rounded-3xl p-5 flex items-center gap-4 text-left hover:bg-white/20 active:scale-95 transition-all duration-200 group ${
                  role === 'buyer' ? 'bg-white/25 ring-2 ring-white/60' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-7 h-7 text-brand-gold-light" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg">I'm Shopping</h3>
                  <p className="text-white/60 text-sm mt-0.5">
                    Browse, buy & discover unique fashion pieces
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleRoleSelect('seller')}
                className={`w-full glass-card rounded-3xl p-5 flex items-center gap-4 text-left hover:bg-white/20 active:scale-95 transition-all duration-200 group ${
                  role === 'seller' ? 'bg-white/25 ring-2 ring-white/60' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-coral/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Tag className="w-7 h-7 text-brand-coral-light" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg">I'm Selling</h3>
                  <p className="text-white/60 text-sm mt-0.5">
                    List your pieces & grow your fashion business
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => { setRole('buyer'); setStep('itemtype'); }}
                className="w-full text-center text-white/60 text-sm pt-1 hover:text-white/80 transition-colors"
              >
                I'm doing both →
              </button>
            </div>
          </div>
        )}

        {/* Item type step */}
        {step === 'itemtype' && (
          <div className="animate-slide-up max-w-sm w-full">
            <div className="text-center mb-8">
              <span className="pill bg-white/20 text-white text-sm mb-3">Step 2 of 2</span>
              <h2 className="font-display font-extrabold text-3xl text-white mt-3 mb-2">
                What's your vibe?
              </h2>
              <p className="text-white/70">
                What kind of fashion are you into?
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleItemTypeSelect('thrift')}
                className={`w-full glass-card rounded-3xl p-5 flex items-center gap-4 text-left hover:bg-white/20 active:scale-95 transition-all duration-200 group ${
                  itemType === 'thrift' ? 'bg-white/25 ring-2 ring-white/60' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-400/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Recycle className="w-7 h-7 text-teal-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg">Thrift & Vintage 🌿</h3>
                  <p className="text-white/60 text-sm mt-0.5">
                    Pre-loved gems, sustainable finds & vintage treasures
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleItemTypeSelect('new')}
                className={`w-full glass-card rounded-3xl p-5 flex items-center gap-4 text-left hover:bg-white/20 active:scale-95 transition-all duration-200 group ${
                  itemType === 'new' ? 'bg-white/25 ring-2 ring-white/60' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-violet/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 text-brand-violet-light" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg">New Arrivals ✨</h3>
                  <p className="text-white/60 text-sm mt-0.5">
                    Fresh drops, new brands & trending pieces
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleItemTypeSelect('both')}
                className="w-full glass-card rounded-3xl p-4 flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all"
              >
                <span className="text-white font-display font-semibold">Show me everything 🔥</span>
              </button>
            </div>
          </div>
        )}

        {/* Done step */}
        {step === 'done' && (
          <div className="animate-slide-up text-center max-w-sm w-full">
            <div className="w-24 h-24 rounded-full gradient-gold mx-auto mb-6 flex items-center justify-center animate-bounce-soft">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl text-white mb-3">
              You're all set!
            </h2>
            <p className="text-white/70 mb-8">
              {role === 'seller'
                ? 'Your seller dashboard is ready. Start listing your pieces!'
                : `We've curated ${itemType === 'thrift' ? 'the best vintage finds' : itemType === 'new' ? 'the freshest drops' : 'everything you need'} just for you.`}
            </p>

            <button
              onClick={handleFinish}
              className="w-full bg-white text-brand-violet font-display font-bold text-lg rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 transition-all shadow-xl"
            >
              Enter Splugery <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Progress dots */}
        {step !== 'welcome' && step !== 'done' && (
          <div className="flex gap-2 mt-8">
            {['role', 'itemtype'].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s ? 'w-8 bg-white' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
