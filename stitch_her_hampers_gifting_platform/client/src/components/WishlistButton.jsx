import { useState, useRef } from 'react';

export default function WishlistButton({ isActive = false, className = '', size = 18 }) {
  const [wishlisted, setWishlisted] = useState(isActive);
  const btnRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);

    // Subtle pop animation
    if (!wishlisted && btnRef.current) {
      btnRef.current.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.3)' },
          { transform: 'scale(1)' },
        ],
        { duration: 250 }
      );
    }
  };

  return (
    <button
      ref={btnRef}
      aria-label="Toggle wishlist"
      onClick={handleClick}
      className={`w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center justify-center active:scale-90 transition-transform ${
        wishlisted ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
      } ${className}`}
    >
      <span
        className={`material-symbols-outlined text-[${size}px]`}
        style={{
          fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0",
        }}
      >
        favorite
      </span>
    </button>
  );
}
