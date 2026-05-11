import { Bell, Search, Sun, Moon, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isMarketplace = location.pathname === '/marketplace';

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0D0D14]/80 backdrop-blur-xl border-b border-neutral-100 dark:border-brand-dark-border">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <button
          onClick={() => navigate('/home')}
          className="font-display font-extrabold text-xl tracking-tight gradient-text flex-shrink-0"
        >
          SPLUGERY
        </button>

        {/* Search bar — visible on marketplace */}
        {isMarketplace && (
          <div className="flex-1 max-w-sm hidden sm:flex items-center gap-2 bg-neutral-100 dark:bg-brand-dark-card rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search styles, brands..."
              className="flex-1 bg-transparent text-sm outline-none text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1">
          {!isMarketplace && (
            <button
              onClick={() => navigate('/marketplace')}
              className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-brand-dark-card transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            </button>
          )}

          <button
            className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-brand-dark-card transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full gradient-brand" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-brand-dark-card transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-brand-gold" />
            ) : (
              <Moon className="w-5 h-5 text-brand-violet" />
            )}
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-brand-violet/30 hover:border-brand-violet transition-colors flex-shrink-0 ml-1"
          >
            <img
              src="https://picsum.photos/seed/myavatar/36/36"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          <button
            className="relative p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-brand-dark-card transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full gradient-brand text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
