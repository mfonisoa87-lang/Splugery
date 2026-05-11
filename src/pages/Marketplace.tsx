import { useState } from 'react';
import { SlidersHorizontal, Grid3X3, List, Search, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';

type Condition = 'all' | 'thrift' | 'new';
type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'popular';
type Layout = 'grid' | 'list';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'popular', label: 'Most Popular' },
];

export default function Marketplace() {
  const [condition, setCondition] = useState<Condition>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sort, setSort] = useState<SortOption>('latest');
  const [layout, setLayout] = useState<Layout>('grid');
  const [search, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);

  const filtered = products.filter(p => {
    const matchCondition = condition === 'all' || p.condition === condition;
    const matchCategory =
      selectedCategory === 'all' ||
      p.category.toLowerCase() === selectedCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCondition && matchCategory && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-brand-dark pb-24">
      <Navbar />

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-[#0D0D14]/95 backdrop-blur-xl border-b border-neutral-100 dark:border-brand-dark-border">
        {/* Search */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-brand-dark-card rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search styles, brands, sellers..."
              className="flex-1 bg-transparent text-sm outline-none text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400"
            />
            {search && (
              <button onClick={() => setSearch('')}>
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            )}
          </div>
        </div>

        {/* Condition tabs */}
        <div className="px-4 pb-2 flex gap-2">
          {(['all', 'thrift', 'new'] as Condition[]).map(c => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`px-4 py-1.5 rounded-xl text-sm font-display font-semibold transition-all ${
                condition === c
                  ? c === 'thrift'
                    ? 'bg-brand-coral text-white'
                    : c === 'new'
                    ? 'bg-brand-violet text-white'
                    : 'gradient-brand text-white'
                  : 'bg-neutral-100 dark:bg-brand-dark-card text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-brand-dark-border'
              }`}
            >
              {c === 'all' ? '✨ All' : c === 'thrift' ? '♻️ Thrift' : '⭐ New'}
            </button>
          ))}

          <div className="ml-auto flex gap-1.5">
            <button
              onClick={() => setShowSort(s => !s)}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-brand-dark-card text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-brand-dark-border transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout(l => (l === 'grid' ? 'list' : 'grid'))}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-brand-dark-card text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-brand-dark-border transition-colors"
            >
              {layout === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Sort options dropdown */}
        {showSort && (
          <div className="px-4 pb-2 flex gap-2 flex-wrap animate-fade-in">
            {sortOptions.map(o => (
              <button
                key={o.value}
                onClick={() => { setSort(o.value); setShowSort(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  sort === o.value
                    ? 'gradient-brand text-white'
                    : 'bg-neutral-100 dark:bg-brand-dark-card text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-violet text-white shadow-sm shadow-brand-violet/30'
                  : 'bg-neutral-100 dark:bg-brand-dark-card text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-brand-dark-border'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 pt-4">
        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold text-neutral-800 dark:text-white">{sorted.length}</span> items found
          </p>
          {condition !== 'all' && (
            <span className={`pill text-xs ${
              condition === 'thrift' ? 'pill-coral' : 'pill-violet'
            }`}>
              {condition === 'thrift' ? '♻️ Thrift' : '⭐ New'}
            </span>
          )}
        </div>

        {/* Products */}
        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-display font-bold text-lg text-neutral-700 dark:text-neutral-300">No items found</p>
            <p className="text-sm text-neutral-400 mt-1">Try different filters or search terms</p>
            <button
              onClick={() => { setSearch(''); setCondition('all'); setSelectedCategory('all'); }}
              className="mt-4 btn-outline text-sm py-2 px-4"
            >
              Clear filters
            </button>
          </div>
        ) : layout === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {sorted.map(p => (
              <ProductCard key={p.id} product={p} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map(p => (
              <ProductCard key={p.id} product={p} layout="list" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
