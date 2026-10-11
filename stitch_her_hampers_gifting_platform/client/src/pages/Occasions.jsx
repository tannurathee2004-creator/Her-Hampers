import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WishlistButton from '../components/WishlistButton';
import ProductCard from '../components/ProductCard';
import fallbackProducts from '../data/products.json';
import fallbackOccasions from '../data/occasions.json';

let API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
if (!API_URL.endsWith('/api')) API_URL += '/api';

const occasionChips = [
  { label: '✨ All Occasions', active: true },
  { label: '🎂 Birthday' },
  { label: '👯 Bestie Hugs' },
  { label: '🎓 Milestones' },
  { label: '💕 Romance' },
  { label: '🌷 Just Because' },
];

export default function Occasions() {
  const [occasions, setOccasions] = useState(fallbackOccasions);
  const [products, setProducts] = useState(fallbackProducts);
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/occasions`)
      .then(res => res.json())
      .then(data => {
        if (data && data.occasions && data.occasions.length > 0) {
          setOccasions(data.occasions);
        }
      })
      .catch(() => setOccasions(fallbackOccasions));
      
    fetch(`${API_URL}/products?sort=best`)
      .then(res => res.json())
      .then(data => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const filteredOccasions = occasions.filter(occasion => {
    if (activeChip === 0) return true;
    const activeEmoji = occasionChips[activeChip].label.split(' ')[0];
    return occasion.emoji === activeEmoji;
  });

  const getProductsForOccasion = (occasion) => {
    // Combine products from API with fallbackProducts (by unique ID)
    const allAvailable = [...products];
    fallbackProducts.forEach(fp => {
      if (!allAvailable.some(p => p.id === fp.id)) {
        allAvailable.push(fp);
      }
    });

    // 1. Direct match by occasionId or occasionName
    let matched = allAvailable.filter(p => 
      (p.occasionId && p.occasionId === occasion.id) ||
      (p.occasionName && p.occasionName.toLowerCase() === occasion.name.toLowerCase())
    );

    // 2. Keyword matching if occasionId is missing on some items
    if (matched.length === 0) {
      const occasionNameLower = (occasion.name || '').toLowerCase();
      if (occasionNameLower.includes('birthday') || occasion.emoji === '🎂') {
        matched = allAvailable.filter(p => 
          p.name.toLowerCase().includes('birthday') || 
          p.tag?.toLowerCase().includes('birthday') ||
          p.occasionId === 1
        );
      } else if (occasionNameLower.includes('friendship') || occasionNameLower.includes('bestie') || occasion.emoji === '👯') {
        matched = allAvailable.filter(p => 
          p.name.toLowerCase().includes('bestie') || 
          p.name.toLowerCase().includes('friendship') || 
          p.name.toLowerCase().includes('sister') ||
          p.tag?.toLowerCase().includes('bestie') ||
          p.occasionId === 2
        );
      } else if (occasionNameLower.includes('graduation') || occasionNameLower.includes('boss') || occasion.emoji === '🎓') {
        matched = allAvailable.filter(p => 
          p.name.toLowerCase().includes('boss') || 
          p.name.toLowerCase().includes('graduate') || 
          p.name.toLowerCase().includes('conquered') ||
          p.tag?.toLowerCase().includes('milestone') ||
          p.occasionId === 3
        );
      } else if (occasionNameLower.includes('anniversary') || occasionNameLower.includes('romance') || occasion.emoji === '💕') {
        matched = allAvailable.filter(p => 
          p.name.toLowerCase().includes('anniversary') || 
          p.name.toLowerCase().includes('romance') || 
          p.name.toLowerCase().includes('love') ||
          p.tag?.toLowerCase().includes('romance') ||
          p.occasionId === 4
        );
      } else if (occasionNameLower.includes('sunshine') || occasionNameLower.includes('just because') || occasion.emoji === '🌷') {
        matched = allAvailable.filter(p => 
          p.name.toLowerCase().includes('sunshine') || 
          p.name.toLowerCase().includes('thinking') || 
          p.tag?.toLowerCase().includes('sunshine') ||
          p.tag?.toLowerCase().includes('just because') ||
          p.occasionId === 5
        );
      }
    }

    // 3. Guaranteed specific fallback from fallbackProducts for this occasion
    if (matched.length === 0) {
      matched = fallbackProducts.filter(p => p.occasionId === occasion.id);
    }

    return matched;
  };

  return (
    <>
      {/* Express Delivery Banner */}
      <div className="px-margin pt-1 pb-3">
        <div className="w-full bg-surface-container-high rounded-full px-4 py-2.5 flex items-center justify-center gap-2 shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04),0_8px_24px_0_rgba(217,101,123,0.06)]">
          <span className="material-symbols-outlined text-primary text-[18px] animate-pulse">local_shipping</span>
          <p className="font-label-sm text-label-sm text-on-surface text-center line-clamp-1">
            Same-Day Delivery in Mumbai, Delhi NCR, Bangalore • Midnight Delivery Available ✨
          </p>
        </div>
      </div>

      {/* Header */}
      <section className="px-margin pt-2 pb-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest mb-2 shadow-sm">
          <span className="material-symbols-outlined text-[14px]">celebration</span>
          <span>Celebrate Every Milestone</span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2 font-semibold">
          Gifts for Every Moment
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
          Handpicked hampers matched to every celebration, milestone, and warm sentiment.
        </p>

        {/* Occasion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 pb-1 -mx-margin px-margin">
          {occasionChips.map((chip, i) => (
            <button
              key={chip.label}
              onClick={() => setActiveChip(i)}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full font-label-sm text-label-sm shrink-0 ${
                activeChip === i
                  ? 'bg-primary text-on-primary shadow-[0_4px_12px_rgba(158,56,78,0.25)]'
                  : 'bg-surface-container-lowest text-on-surface-variant shadow-sm'
              }`}
            >
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Occasion Cards & Hampers */}
      <div className="flex flex-col gap-8 pb-8">
        {filteredOccasions.filter(o => o.image).map((occasion) => (
          <div key={occasion.id} className="flex flex-col gap-4">
            <article className="mx-margin group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04),0_8px_24px_0_rgba(217,101,123,0.06)] transition-all duration-300">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container-low">
                <img
                  alt={occasion.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={occasion.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center gap-1 text-on-surface font-label-sm text-label-sm">
                  <span>{occasion.emoji}</span>
                  <span>{occasion.badge}</span>
                </div>
                <WishlistButton product={occasion} className="absolute top-3.5 right-3.5 w-9 h-9" />
                <div className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full bg-primary/95 text-on-primary font-currency-md text-currency-md shadow-lg flex items-center gap-1">
                  <span className="font-label-sm text-[11px] opacity-90">Starting</span>
                  <span>₹{(occasion.startingPrice || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{occasion.name}</h3>
                  <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    {occasion.rating} ({occasion.reviews >= 1000 ? `${(occasion.reviews / 1000).toFixed(1)}k` : occasion.reviews})
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">{occasion.description}</p>
                <div className="w-full h-0.5 bg-surface-container my-1 rounded-full"></div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">{occasion.featureIcon}</span>
                    <span>{occasion.feature}</span>
                  </span>
                  <Link
                    to={`/shop?occasion=${occasion.id}`}
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md shadow-sm active:scale-95 transition-transform"
                  >
                    <span>Explore ({getProductsForOccasion(occasion).length || occasion.count})</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* Render matched Hampers here */}
            <div className="px-margin flex flex-col gap-2">
              <h4 className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 ml-1">
                <span>{occasion.emoji}</span> Hampers for {occasion.name}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {getProductsForOccasion(occasion).map(product => (
                  <ProductCard key={product.id} product={product} variant="grid" />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Just Because Card */}
        {filteredOccasions.filter(o => !o.image).map((occasion) => (
          <div key={occasion.id} className="flex flex-col gap-4">
            <article className="relative mx-margin bg-gradient-to-br from-surface-container-low via-surface-container-lowest to-surface-container-high rounded-3xl p-5 shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04),0_8px_24px_0_rgba(217,101,123,0.06)] overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                  <span>{occasion.emoji}</span>
                  <span>{occasion.badge}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-currency-md text-currency-md text-xs shadow-sm">
                  Starting from ₹{(occasion.startingPrice || 0).toLocaleString('en-IN')}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">{occasion.name}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">{occasion.description}</p>
              <div className="bg-surface-container-lowest/80 backdrop-blur-sm rounded-2xl p-3.5 mb-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-primary text-[20px]">{occasion.featureIcon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface">{occasion.feature}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Custom calligraphy included free</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-semibold">FREE</span>
              </div>
              <Link to="/shop?occasion=5" className="relative z-10 flex-1 py-3 px-4 rounded-full bg-primary text-on-primary text-center font-label-lg text-label-lg shadow-[0_4px_16px_rgba(158,56,78,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-1">
                <span>Explore Care Packs ({getProductsForOccasion(occasion).length || occasion.count})</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </article>

            {/* Render matched Hampers here */}
            <div className="px-margin flex flex-col gap-2">
              <h4 className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 ml-1">
                <span>{occasion.emoji}</span> Hampers for {occasion.name}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {getProductsForOccasion(occasion).map(product => (
                  <ProductCard key={product.id} product={product} variant="grid" />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Custom Curation Bar */}
        <div className="bg-surface-container rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary text-[22px]">magic_button</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface">Can't decide on an occasion?</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Build your bespoke hamper step-by-step.</span>
            </div>
          </div>
          <Link to="/quiz" className="shrink-0 px-3.5 py-2 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm active:scale-95 transition-transform">
            Custom Box
          </Link>
        </div>
      </div>
    </>
  );
}
