import { useState } from 'react';
import {
  Settings,
  Star,
  Package,
  Heart,
  ShieldCheck,
  ChevronRight,
  Edit3,
  MapPin,
  Moon,
  Sun,
  Bell,
  HelpCircle,
  LogOut,
  Camera,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/mockData';

const WISHLIST = products.filter(p => p.liked);
const PURCHASES = products.slice(0, 3);

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 text-center">
      <p className="font-display font-extrabold text-xl gradient-text">{value}</p>
      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{label}</p>
    </div>
  );
}

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'purchases' | 'listings' | 'wishlist'>('purchases');
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('Lagos-based fashion lover. Thrift queen. Style is my superpower. 💜');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  type MenuItem = {
    icon: React.ElementType;
    label: string;
    action?: () => void;
    badge?: string;
    danger?: boolean;
  };

  const menuItems: { group: string; items: MenuItem[] }[] = [
    {
      group: 'Account',
      items: [
        { icon: Edit3, label: 'Edit Profile', action: () => setEditMode(true) },
        { icon: Bell, label: 'Notifications', badge: '3' },
        { icon: ShieldCheck, label: 'Verification & Trust', badge: 'Verified' },
      ],
    },
    {
      group: 'Preferences',
      items: [
        {
          icon: theme === 'dark' ? Sun : Moon,
          label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
          action: toggleTheme,
        },
        { icon: MapPin, label: 'Location & Delivery' },
        { icon: Settings, label: 'App Settings' },
      ],
    },
    {
      group: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Centre' },
        { icon: LogOut, label: 'Sign Out', action: handleLogout, danger: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-brand-dark pb-24">
      <Navbar />

      <main className="max-w-screen-xl mx-auto">
        {/* Profile header */}
        <div className="px-4 pt-5 pb-0">
          <div className="bg-white dark:bg-brand-dark-card rounded-3xl p-5 card-shadow dark:card-shadow-dark">
            {/* Avatar + edit */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-brand-violet/30">
                  <img
                    src="https://picsum.photos/seed/myavatar/80/80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-brand flex items-center justify-center shadow-md">
                  <Camera className="w-3 h-3 text-white" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="font-display font-extrabold text-lg text-neutral-900 dark:text-white">
                    Amara Okafor
                  </h2>
                  <ShieldCheck className="w-4 h-4 text-brand-violet" />
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">@amara_style</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3 h-3 fill-brand-gold text-brand-gold" />
                  ))}
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-0.5">(47 reviews)</span>
                </div>
              </div>

              <button
                onClick={() => setEditMode(e => !e)}
                className="p-2 rounded-xl bg-neutral-100 dark:bg-brand-dark-border hover:bg-neutral-200 dark:hover:bg-brand-dark-border/70 transition-colors"
              >
                <Edit3 className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              </button>
            </div>

            {/* Bio */}
            {editMode ? (
              <div className="mb-4">
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-brand-dark-border rounded-xl px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 outline-none focus:ring-2 focus:ring-brand-violet/40 resize-none"
                  rows={3}
                />
                <button
                  onClick={() => setEditMode(false)}
                  className="mt-2 gradient-brand text-white text-xs font-semibold px-4 py-1.5 rounded-xl"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">{bio}</p>
            )}

            {/* Stats */}
            <div className="flex items-center divide-x divide-neutral-100 dark:divide-brand-dark-border border border-neutral-100 dark:border-brand-dark-border rounded-2xl py-3">
              <StatPill label="Items Sold" value="24" />
              <StatPill label="Active Squads" value="3" />
              <StatPill label="Portfolio" value="₦35k" />
              <StatPill label="Style Score" value="92" />
            </div>
          </div>
        </div>

        {/* Seller CTA */}
        <div className="px-4 mt-4">
          <div className="rounded-2xl bg-gradient-to-r from-brand-coral/10 to-brand-gold/10 dark:from-brand-coral/20 dark:to-brand-gold/20 border border-brand-coral/20 dark:border-brand-coral/30 p-4 flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-sm text-neutral-800 dark:text-white">Ready to sell?</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">List your first item in 60 seconds</p>
            </div>
            <button className="bg-brand-coral text-white font-semibold text-xs px-4 py-2 rounded-xl hover:bg-brand-coral/90 active:scale-95 transition-all">
              + List Item
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mt-4">
          <div className="flex gap-1 bg-neutral-100 dark:bg-brand-dark-card rounded-2xl p-1">
            {([
              { key: 'purchases', label: '🛍️ Purchases' },
              { key: 'listings', label: '🏷️ Listings' },
              { key: 'wishlist', label: '❤️ Wishlist' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-white dark:bg-brand-dark-border text-brand-violet dark:text-brand-violet-light shadow-sm'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="px-4 mt-4">
          {activeTab === 'purchases' && (
            <div className="space-y-3">
              {PURCHASES.map(p => (
                <div key={p.id} className="flex gap-3 bg-white dark:bg-brand-dark-card rounded-2xl p-3 card-shadow dark:card-shadow-dark">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-neutral-100 dark:bg-brand-dark-border flex-shrink-0">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">{p.brand}</p>
                    <p className="font-display font-semibold text-sm text-neutral-900 dark:text-white truncate">{p.title}</p>
                    <p className="font-bold text-brand-violet dark:text-brand-violet-light text-sm mt-1">
                      ₦{p.price.toLocaleString()}
                    </p>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                      p.condition === 'thrift' ? 'bg-brand-coral/10 text-brand-coral' : 'bg-brand-violet/10 text-brand-violet'
                    }`}>
                      {p.condition === 'thrift' ? 'Thrift' : 'New'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1 py-1">
                    <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded-full">
                      Delivered
                    </span>
                    <button className="text-xs text-brand-violet dark:text-brand-violet-light font-medium hover:underline">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="text-center py-12 bg-white dark:bg-brand-dark-card rounded-3xl card-shadow dark:card-shadow-dark">
              <Package className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
              <p className="font-display font-bold text-neutral-600 dark:text-neutral-300">No listings yet</p>
              <p className="text-sm text-neutral-400 mt-1 mb-4">Your listed items will appear here</p>
              <button className="btn-primary text-sm py-2.5 px-5">
                List Your First Item
              </button>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-3">
              {WISHLIST.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-brand-dark-card rounded-3xl card-shadow dark:card-shadow-dark">
                  <Heart className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                  <p className="font-display font-bold text-neutral-600 dark:text-neutral-300">Nothing saved yet</p>
                  <p className="text-sm text-neutral-400 mt-1 mb-4">Heart items in the marketplace to save them here</p>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="btn-primary text-sm py-2.5 px-5"
                  >
                    Browse Marketplace
                  </button>
                </div>
              ) : WISHLIST.map(p => (
                <div key={p.id} className="flex gap-3 bg-white dark:bg-brand-dark-card rounded-2xl p-3 card-shadow dark:card-shadow-dark">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-neutral-100 dark:bg-brand-dark-border flex-shrink-0">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">{p.brand}</p>
                    <p className="font-display font-semibold text-sm text-neutral-900 dark:text-white truncate">{p.title}</p>
                    <p className="font-bold text-brand-violet dark:text-brand-violet-light text-sm mt-1">
                      ₦{p.price.toLocaleString()}
                    </p>
                  </div>
                  <button className="self-center gradient-brand text-white text-xs font-semibold px-3 py-1.5 rounded-xl active:scale-95 transition-all">
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings menu */}
        <div className="px-4 mt-5 space-y-4 pb-4">
          {menuItems.map(group => (
            <div key={group.group} className="bg-white dark:bg-brand-dark-card rounded-2xl overflow-hidden card-shadow dark:card-shadow-dark">
              <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-4 pt-3 pb-1">
                {group.group}
              </p>
              {group.items.map(({ icon: Icon, label, action, badge, danger }, i) => (
                <button
                  key={label}
                  onClick={action}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-neutral-50 dark:hover:bg-brand-dark-border/50 transition-colors ${
                    i < group.items.length - 1 ? 'border-b border-neutral-50 dark:border-brand-dark-border/50' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    danger
                      ? 'bg-red-50 dark:bg-red-900/20'
                      : 'bg-brand-violet/10 dark:bg-brand-violet/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${danger ? 'text-red-500' : 'text-brand-violet dark:text-brand-violet-light'}`} />
                  </div>
                  <span className={`flex-1 text-sm font-medium text-left ${
                    danger ? 'text-red-500' : 'text-neutral-700 dark:text-neutral-300'
                  }`}>
                    {label}
                  </span>
                  {badge && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      badge === 'Verified'
                        ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                        : 'gradient-brand text-white'
                    }`}>
                      {badge}
                    </span>
                  )}
                  {!danger && <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600" />}
                </button>
              ))}
            </div>
          ))}

          <p className="text-center text-xs text-neutral-300 dark:text-neutral-600 pb-2">
            Splugery v1.0.0 • Made with 💜 in Lagos
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
