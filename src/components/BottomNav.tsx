import { Home, ShoppingBag, Users, TrendingUp, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: ShoppingBag, label: 'Market', path: '/marketplace' },
  { icon: Users, label: 'Squads', path: '/squads' },
  { icon: TrendingUp, label: 'Invest', path: '/invest' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0D0D14]/90 backdrop-blur-xl border-t border-neutral-100 dark:border-brand-dark-border safe-area-pb">
      <div className="max-w-screen-xl mx-auto flex items-center justify-around px-2 h-16">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 ${
                active ? 'scale-105' : 'opacity-50 hover:opacity-80'
              }`}
            >
              {active ? (
                <div className="p-1.5 rounded-xl gradient-brand">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <Icon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              )}
              <span
                className={`text-[10px] font-semibold font-body ${
                  active
                    ? 'gradient-text'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
