import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const filters = [
  { key: 'all', label: 'All', count: 74 },
  { key: 'beauty', label: 'Beauty & Self-Care' },
  { key: 'chocolates', label: 'Chocolates & Treats' },
  { key: 'cozy', label: 'Cute & Cozy' },
  { key: 'floral', label: 'Flowers & Scent' },
  { key: 'budget', label: 'Under ₹999' },
  { key: 'luxury', label: '✨ Luxury VIP' },
];

const sortOptions = [
  { key: 'best', label: 'Best Selling' },
  { key: 'price-low', label: 'Price: Low to High' },
  { key: 'price-high', label: 'Price: High to Low' },
  { key: 'rating', label: 'Customer Rating' },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('best');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const sortRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeFilter !== 'all') {
      if (activeFilter === 'budget') {
        params.set('maxPrice', '999');
      } else if (activeFilter === 'luxury') {
        params.set('minPrice', '2000');
      } else {
        params.set('category', activeFilter);
      }
    }
    params.set('sort', activeSort);

    fetch(`${API_URL}/products?${params}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [activeFilter, activeSort]);

  // Close sort menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Header */}
      <section className="px-margin pt-1 pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Artisan Collections
            </span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Curated Hampers for Her</h1>
          </div>
          <div className="h-9 px-3 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md shadow-sm">
            {products.length} gifts
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Lovingly hand-packed with fragrant florals, silk ribbons, and bespoke keepsakes.
        </p>
      </section>

      {/* Filter & Sort */}
      <section className="w-full flex flex-col gap-2.5 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto px-margin no-scrollbar py-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-label-md text-label-md shadow-sm transition-all flex items-center gap-1.5 ${
                activeFilter === f.key
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span>{f.label}</span>
              {f.count && activeFilter === f.key && (
                <span className="bg-primary-container text-on-primary-container text-[11px] px-1.5 py-0.5 rounded-full font-label-sm">{f.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-margin pt-1">
          <div className="relative inline-block text-left" ref={sortRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setShowSortMenu(!showSortMenu); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[17px] text-primary">swap_vert</span>
              <span>Sort: {sortOptions.find(s => s.key === activeSort)?.label}</span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
            </button>
            {showSortMenu && (
              <div className="absolute left-0 mt-1.5 w-48 rounded-2xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(72,52,65,0.12)] p-1.5 z-40">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setActiveSort(opt.key); setShowSortMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-label-md text-label-md hover:bg-surface-container-high transition-colors ${
                      activeSort === opt.key ? 'text-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[15px] text-secondary">tune</span>
            <span>Filters (2)</span>
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-margin grid grid-cols-2 gap-3 pb-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px] animate-pulse text-primary">auto_awesome</span>
              <span className="font-label-md text-label-md">Curating her collection...</span>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
              <span className="font-label-md text-label-md">No hampers found in this category</span>
            </div>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))
        )}
      </section>

      {/* Quiz Prompt */}
      <section className="px-margin pb-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container to-surface-container-highest p-4 shadow-[0_4px_20px_rgba(158,56,78,0.08)]">
          <div className="absolute -right-4 -bottom-4 text-primary/10 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">magic_button</span>
          </div>
          <div className="relative z-10 flex flex-col gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md w-fit shadow-xs">
              <span className="material-symbols-outlined text-[14px] text-secondary">psychology_alt</span>
              <span className="font-label-sm text-[10px] text-on-surface uppercase tracking-wider font-semibold">Gifting Concierge</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Can't decide her favorite?</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Answer 3 quick questions to discover the ideal gift, or build a personalized crate from scratch!
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Link to="/quiz" className="flex-1 py-2.5 px-3 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[17px]">quiz</span>
                <span>30s Hamper Quiz</span>
              </Link>
              <button className="py-2.5 px-4 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[17px]">arrows_outward</span>
                <span>Custom Box</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
