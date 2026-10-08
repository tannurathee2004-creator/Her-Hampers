import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products?sort=best`)
      .then(res => res.json())
      .then(data => setBestSellers(data.products?.slice(0, 4) || []))
      .catch(() => setBestSellers([]));
  }, []);

  return (
    <>
      {/* Top Greeting & Live Milestone Sparkle */}
      <section className="px-margin pt-space-sm pb-space-xs flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-fixed text-primary shadow-sm">
            <span className="material-symbols-outlined text-[16px]">favorite</span>
          </span>
          <span className="font-label-md text-label-md text-on-surface">Curated for cherishing her</span>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-high px-space-xs py-0.5 rounded-full">
          <span className="material-symbols-outlined text-tertiary text-[14px]">local_shipping</span>
          <span className="font-label-sm text-[10px] text-tertiary">Same-Day Dispatch</span>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="px-margin pt-space-xs pb-space-md">
        <div className="relative w-full rounded-lg overflow-hidden bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(72,52,65,0.06),0_16px_36px_0_rgba(217,101,123,0.12)]">
          <div className="relative w-full h-80 overflow-hidden">
            <img
              alt="The Rose and Gold Reverie artisan hamper"
              className="w-full h-full object-cover object-center transform scale-100 active:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnxtdiUU6CoO4s-jrSQc_NfxO6T5lLSY3DQ_VIik30qDvdnaa4CJsZDr4dl1fC95dvG77Yz-3cStqqATDzM3nY4mqpUil-A3mWghdxg8jg5u508kr6ePC9LJt0L9JDpiGMosI-28LY_wZKkoQimAmGzeuMBF3-F1_pcBC6qLa7K-HZWJK74r4To_OoIN3M5AXas3Irwvspxnu9xLeaF3j-JikHsbji2JOd0hkZ_EHMc8rDB-0T1raA8g"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent"></div>
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm text-primary font-label-sm text-label-sm tracking-wider uppercase">
                <span className="material-symbols-outlined text-[14px] text-tertiary">arrow_back_ios_new</span>
                Handmade with Love &amp; Care
              </span>
            </div>
            <button aria-label="Save Curated Collection" className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-primary shadow-sm active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[20px]">favorite_border</span>
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-space-md flex flex-col gap-1.5 text-on-primary">
              <span className="font-label-sm text-[11px] text-primary-fixed uppercase tracking-widest font-semibold">Artisan Edition • Limited Batch</span>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary drop-shadow-sm font-bold">
                Little Things, Big Smiles.
              </h1>
              <p className="font-body-sm text-body-sm text-surface-variant line-clamp-2 max-w-[90%]">
                Thoughtfully curated hampers made for the special women in your life. Unbox warmth, keepsake jewelry &amp; French scents.
              </p>
              <div className="flex items-center gap-space-sm pt-space-xs mt-1">
                <Link to="/shop" className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-space-md rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-[0_4px_16px_rgba(158,56,78,0.35)] active:scale-[0.98] transition-all">
                  <span>Shop Hampers</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link to="/quiz" className="flex-1 inline-flex items-center justify-center gap-1 py-3 px-space-sm rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm active:scale-[0.98] transition-all">
                  <span>Build Your Own</span>
                  <span className="material-symbols-outlined text-[16px] text-tertiary">magic_button</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Occasion Pills */}
      <section className="pb-space-md">
        <div className="px-margin flex items-center justify-between mb-space-xs">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Celebrate Today</span>
          <Link to="/occasions" className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
            All Moments <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </Link>
        </div>
        <div className="flex gap-space-xs overflow-x-auto px-margin no-scrollbar py-1 scroll-smooth">
          {[
            { emoji: '🎂', label: 'Birthday', active: true },
            { emoji: '👯', label: 'Best Friend' },
            { emoji: '🎓', label: 'Graduation' },
            { emoji: '💕', label: 'Anniversary' },
            { emoji: '🌷', label: 'Self-Care' },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap shadow-sm active:scale-95 transition-transform flex-shrink-0 ${
                item.active
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface'
              }`}
            >
              <span className="text-[15px]">{item.emoji}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="px-margin pb-space-lg">
        <div className="flex items-baseline justify-between mb-space-sm">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Curated Aisles</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Uniquely themed keepsakes</p>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed/40 px-2 py-0.5 rounded-full">4 Categories</span>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          {[
            { icon: 'spa', title: 'Beauty & Self-Care', desc: 'Glow, mist & botanicals', count: 28, color: 'text-primary', bgAccent: 'bg-primary-fixed/20' },
            { icon: 'cookie', title: 'Chocolates & Treats', desc: 'Artisan macarons & cocoa', count: 19, color: 'text-tertiary', bgAccent: 'bg-tertiary-fixed/30' },
            { icon: 'favorite', title: 'Cute & Cozy', desc: 'Plush throws & mugs', count: 34, color: 'text-secondary', bgAccent: 'bg-secondary-fixed/30' },
            { icon: 'local_florist', title: 'Flowers & Scent', desc: 'Dried ranunculus & wax', count: 16, color: 'text-primary-container', bgAccent: 'bg-primary-fixed/20' },
          ].map((cat) => (
            <Link
              key={cat.title}
              to="/shop"
              className="relative p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between h-36 overflow-hidden shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04)] active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center ${cat.color} shadow-sm`}>
                  <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface/80 px-2 py-0.5 rounded-full">{cat.count} gifts</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">{cat.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">{cat.desc}</p>
              </div>
              <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full ${cat.bgAccent} pointer-events-none group-hover:scale-125 transition-transform`}></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Quiz Banner */}
      <section className="px-margin pb-space-lg">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-secondary-fixed via-surface-container-high to-primary-fixed p-space-md flex flex-col gap-space-sm shadow-[0_4px_16px_-2px_rgba(72,52,65,0.06)]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1 max-w-[70%]">
              <div className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-secondary-fixed uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                Gift Concierge AI
              </div>
              <h3 className="font-headline-md text-headline-md text-on-secondary-fixed leading-snug">
                Find Her Perfect Hamper in 60 seconds ✨
              </h3>
              <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant">
                Answer 3 fun questions about her personality, taste &amp; vibe.
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-secondary text-[28px]">auto_awesome</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex -space-x-2 overflow-hidden">
              <span className="inline-flex h-6 w-6 rounded-full bg-primary text-on-primary text-[10px] font-bold items-center justify-center ring-2 ring-surface">P</span>
              <span className="inline-flex h-6 w-6 rounded-full bg-secondary text-on-secondary text-[10px] font-bold items-center justify-center ring-2 ring-surface">S</span>
              <span className="inline-flex h-6 w-6 rounded-full bg-tertiary text-on-tertiary text-[10px] font-bold items-center justify-center ring-2 ring-surface">A</span>
              <div className="h-6 px-2 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-[10px] flex items-center justify-center">+4.2k tested</div>
            </div>
            <Link to="/quiz" className="px-space-md py-2 rounded-full bg-inverse-surface text-inverse-on-surface font-label-md text-label-md shadow-md active:scale-95 transition-all flex items-center gap-1">
              <span>Take Quiz</span>
              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="pb-space-lg">
        <div className="px-margin flex items-end justify-between mb-space-sm">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">Most Adored</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Her Favorites</h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
          </div>
        </div>
        <div className="flex gap-space-md overflow-x-auto px-margin no-scrollbar pb-2 scroll-smooth">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} variant="slider" />
          ))}
        </div>
      </section>

      {/* Budget Hampers */}
      <section className="px-margin pb-space-lg">
        <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm shadow-[0_4px_16px_-2px_rgba(72,52,65,0.03)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">card_giftcard</span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Pocket-Friendly Gifting</h3>
                <p className="font-body-sm text-[11px] text-on-surface-variant">Luxe presents for every budget</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant text-[20px]">loyalty</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { icon: 'celebration', color: 'text-tertiary', price: '₹499', label: 'Sweet Treats', labelColor: 'text-primary' },
              { icon: 'redeem', color: 'text-primary', price: '₹999', label: 'Most Loved', labelColor: 'text-secondary', priceColor: 'text-primary' },
              { icon: 'diamond', color: 'text-secondary', price: '₹1,499', label: 'Luxe Hampers', labelColor: 'text-tertiary' },
            ].map((badge) => (
              <Link
                key={badge.price}
                to="/shop"
                className="p-2.5 rounded-DEFAULT bg-surface-container-lowest flex flex-col items-center text-center shadow-sm active:scale-95 transition-transform group"
              >
                <span className={`material-symbols-outlined ${badge.color} text-[20px] mb-1 group-hover:scale-110 transition-transform`}>{badge.icon}</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">Under</span>
                <span className={`font-currency-md text-currency-md font-bold ${badge.priceColor || 'text-on-surface'}`}>{badge.price}</span>
                <span className={`text-[9px] ${badge.labelColor} font-semibold mt-0.5`}>{badge.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Love Notes & Reviews */}
      <section className="px-margin pb-space-lg">
        <div className="relative overflow-hidden rounded-lg bg-surface-container-high p-space-md flex flex-col gap-space-sm shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04)]">
          <span className="material-symbols-outlined text-[72px] text-surface-variant/40 absolute -bottom-4 right-2 pointer-events-none">format_quote</span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-tertiary">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-primary tracking-wider bg-primary-fixed px-2 py-0.5 rounded-full">
              Verified Gifter
            </span>
          </div>
          <blockquote className="font-headline-sm text-headline-sm italic text-on-surface leading-relaxed">
            "She literally cried happy tears unboxing her birthday hamper! The personalized wax-sealed card and scented candle were sheer perfection."
          </blockquote>
          <div className="flex items-center gap-space-sm pt-1">
            <div className="w-9 h-9 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-[13px] shadow-sm">
              AS
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">Ananya Sharma</span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">Bangalore • Sent to her Sister</span>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Grid Preview */}
      <section className="px-margin pb-space-lg">
        <div className="flex items-end justify-between mb-space-sm">
          <div>
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[16px]">camera</span>
              <span className="font-label-sm text-[11px] font-bold tracking-wider">#HerHampersSmiles</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Unboxing Joy</h2>
          </div>
          <a href="#" className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
            @herhampers.in
          </a>
        </div>
        <div className="grid grid-cols-2 gap-space-xs">
          {[
            { alt: 'Close-up of pastel pink hamper unboxing moments', likes: '1.4k', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnxtdiUU6CoO4s-jrSQc_NfxO6T5lLSY3DQ_VIik30qDvdnaa4CJsZDr4dl1fC95dvG77Yz-3cStqqATDzM3nY4mqpUil-A3mWghdxg8jg5u508kr6ePC9LJt0L9JDpiGMosI-28LY_wZKkoQimAmGzeuMBF3-F1_pcBC6qLa7K-HZWJK74r4To_OoIN3M5AXas3Irwvspxnu9xLeaF3j-JikHsbji2JOd0hkZ_EHMc8rDB-0T1raA8g' },
            { alt: 'Cozy evening tea unboxing hamper', likes: '2.1k', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCjZ3YglABlySBpsY0IS4O7YOi2Mi2PBgRhpuprtAPmOFdG_q7A9GXlrTCbDlD8ZwV0aKxNwqFbvfgep8jprcduyvBqze3e-jg2la-LuhJdV4DR3NOVho5crrJ3E7Iem7UnpyxHzgjQhKv8itjImSidg85P_XACeDfp-0itUA2yuUAhs0tlc7PTgViXUxfsglD1ICyfEL1CuSchjoN8XwRIWMoT7rJgkbvT_iiTp792YnM3kYsIdg-Iw' },
          ].map((item, i) => (
            <div key={i} className="relative h-44 rounded-DEFAULT overflow-hidden group">
              <img alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
              <div className="absolute inset-0 bg-inverse-surface/10"></div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-surface-container-lowest/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-primary">
                <span className="material-symbols-outlined text-[12px]">favorite</span>
                <span className="font-label-sm text-[9px] font-bold">{item.likes}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-space-md p-space-md rounded-lg bg-surface-container-lowest text-center flex flex-col items-center gap-space-xs shadow-sm">
          <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-1">
            <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Get 10% Off Her First Box</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
            Join our secret gifting club for early festival hamper drops &amp; complimentary handwritten wax seal upgrades.
          </p>
          <div className="w-full flex items-center gap-2 mt-space-xs">
            <input
              className="flex-1 h-12 px-4 rounded-full bg-surface-container-low text-on-surface font-body-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
              placeholder="Enter your phone or email"
              type="email"
            />
            <button className="h-12 px-5 rounded-full bg-primary text-on-primary font-label-md text-label-md active:scale-95 transition-transform flex-shrink-0">
              Unlock
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
