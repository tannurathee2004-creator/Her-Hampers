import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WishlistButton from '../components/WishlistButton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const occasionChips = [
  { label: '✨ All Occasions', active: true },
  { label: '🎂 Birthday' },
  { label: '👯 Bestie Hugs' },
  { label: '🎓 Milestones' },
  { label: '💕 Romance' },
];

export default function Occasions() {
  const [occasions, setOccasions] = useState([]);
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/occasions`)
      .then(res => res.json())
      .then(data => setOccasions(data.occasions || []))
      .catch(() => setOccasions([]));
  }, []);

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

      {/* Occasion Cards */}
      <div className="px-margin flex flex-col gap-5 pb-6">
        {occasions.filter(o => o.image).map((occasion) => (
          <article
            key={occasion.id}
            className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04),0_8px_24px_0_rgba(217,101,123,0.06)] transition-all duration-300 active:scale-[0.99]"
          >
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
              <WishlistButton className="absolute top-3.5 right-3.5 w-9 h-9" />
              <div className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full bg-primary/95 text-on-primary font-currency-md text-currency-md shadow-lg flex items-center gap-1">
                <span className="font-label-sm text-[11px] opacity-90">Starting</span>
                <span>₹{occasion.startingPrice.toLocaleString('en-IN')}</span>
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
                  to="/shop"
                  className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md shadow-sm active:scale-95 transition-transform"
                >
                  <span>Explore ({occasion.count})</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* Just Because Card */}
        {occasions.filter(o => !o.image).map((occasion) => (
          <article
            key={occasion.id}
            className="relative bg-gradient-to-br from-surface-container-low via-surface-container-lowest to-surface-container-high rounded-3xl p-5 shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04),0_8px_24px_0_rgba(217,101,123,0.06)] overflow-hidden"
          >
            <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                <span>{occasion.emoji}</span>
                <span>{occasion.badge}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-currency-md text-currency-md text-xs shadow-sm">
                Starting from ₹{occasion.startingPrice}
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
            <Link to="/shop" className="flex-1 py-3 px-4 rounded-full bg-primary text-on-primary text-center font-label-lg text-label-lg shadow-[0_4px_16px_rgba(158,56,78,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-1">
              <span>Explore Care Packs ({occasion.count})</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </article>
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
