import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getPageLabel = () => {
    switch (location.pathname) {
      case '/': return 'Home';
      case '/shop': return 'Shop All';
      case '/occasions': return 'Occasions';
      case '/quiz': return 'Gift Quiz';
      default: return 'Home';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04),0_8px_24px_0_rgba(217,101,123,0.06)]">
      {/* Announcement Bar */}
      <div className="bg-primary-fixed text-on-primary-fixed-variant px-margin py-1 text-center font-label-sm text-label-sm overflow-hidden whitespace-nowrap">
        <p className="tracking-wide">✨ Free Express Delivery on orders above ₹1499 • Handcrafted with love in India 🇮🇳</p>
      </div>

      {/* Main Nav */}
      <div className="h-16 px-margin flex items-center justify-between gap-space-sm">
        <Link to="/" className="flex items-center gap-space-sm">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary leading-none">Her Hampers</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px] tracking-wider">{getPageLabel()}</span>
          </div>
        </Link>

        <div className="flex items-center gap-space-xs">
          <button aria-label="Search" className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
          <button aria-label="Wishlist" className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-primary text-on-primary font-label-sm text-[10px] rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(158,56,78,0.3)]">2</span>
          </button>
          <button aria-label="Cart" className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-tertiary-container text-on-tertiary-container font-label-sm text-[10px] rounded-full flex items-center justify-center">1</span>
          </button>
          <div className="w-8 h-8 ml-1 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(158,56,78,0.2)]">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
