import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'auto_awesome', label: 'Home', dataPath: 'home' },
  { path: '/shop', icon: 'featured_seasonal_and_gifts', label: 'Shop', dataPath: 'shop-all' },
  { path: '/occasions', icon: 'celebration', label: 'Occasions', dataPath: 'occasions' },
  { path: '/quiz', icon: 'arrows_outward', label: 'Build', dataPath: 'build-a-box', badge: 'Custom' },
  { path: '/cart', icon: 'shopping_basket', label: '₹1,499', dataPath: 'cart-bag', isPrice: true },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe pointer-events-none px-margin mb-3">
      <div className="pointer-events-auto max-w-md mx-auto h-16 rounded-xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_8px_24px_-4px_rgba(72,52,65,0.08),0_16px_36px_0_rgba(217,101,123,0.12)] flex items-center justify-around px-space-xs">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.dataPath}
              to={item.path}
              className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 min-w-[44px] h-14 transition-all ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.badge && (
                <span className="absolute -top-1 bg-secondary-fixed text-on-secondary-fixed text-[9px] font-label-sm px-1.5 py-0.5 rounded-full leading-tight uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
              <span className={`material-symbols-outlined text-[22px] ${item.badge ? 'mt-1' : ''}`}>
                {item.icon}
              </span>
              {item.isPrice ? (
                <span className="font-currency-md text-currency-md text-[10px] leading-tight">{item.label}</span>
              ) : (
                <span className="font-label-sm text-[10px]">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
