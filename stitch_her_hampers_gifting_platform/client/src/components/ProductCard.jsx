import { useState } from 'react';
import WishlistButton from './WishlistButton';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function ProductCard({ product, variant = 'grid' }) {
  const [added, setAdded] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleMoveToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
    setWishlistAdded(true);
    setTimeout(() => setWishlistAdded(false), 1200);
  };

  if (variant === 'slider') {
    return (
      <div className="w-72 flex-shrink-0 rounded-lg bg-surface-container-lowest p-space-sm flex flex-col shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04),0_8px_24px_0_rgba(217,101,123,0.06)]">
        <div className="relative w-full h-64 rounded-DEFAULT overflow-hidden bg-surface-container">
          <img
            alt={product.name}
            className="w-full h-full object-cover"
            src={product.image}
          />
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-[10px] font-bold uppercase tracking-wider">
            {product.tag}
          </span>
          <WishlistButton
            product={product}
            className="absolute top-2.5 right-2.5"
          />
        </div>
        <div className="pt-space-sm pb-1 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">{product.rating}</span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">({product.reviews})</span>
              </div>
              <span className="font-label-sm text-[10px] text-primary font-bold">{product.extras}</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1">{product.name}</h4>
            <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1 mt-0.5">{product.description}</p>
          </div>
          <div className="pt-space-sm mt-space-xs flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-currency-md text-currency-md text-primary font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="font-body-sm text-[12px] text-outline line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <span className="font-label-sm text-[9px] text-secondary font-semibold">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} Today
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-[120px]">
              <button
                onClick={handleAddToCart}
                className={`w-full px-2 py-1.5 rounded-full font-label-md text-[10px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all ${
                  added ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">{added ? 'check' : 'add'}</span>
                <span>{added ? 'Added!' : 'Add to Box'}</span>
              </button>
              <button
                onClick={handleMoveToWishlist}
                className={`w-full px-2 py-1.5 rounded-full border border-outline font-label-md text-[10px] flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 ${
                  wishlistAdded ? 'bg-secondary text-on-secondary border-secondary' : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">favorite</span>
                <span>{wishlistAdded ? 'Moved!' : 'Move to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <article className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04),0_8px_24px_0_rgba(217,101,123,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(72,52,65,0.06),0_16px_36px_0_rgba(217,101,123,0.12)]">
      <div className="relative aspect-square w-full bg-surface-container-low overflow-hidden">
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src={product.image}
        />
        <WishlistButton
          product={product}
          className="absolute top-2 right-2"
        />
        {product.tagType === 'bestseller' && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[9px] uppercase tracking-wider font-bold shadow-sm">
            Best Seller
          </div>
        )}
        {product.tagType === 'new' && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-[9px] uppercase tracking-wider font-bold shadow-sm">
            New
          </div>
        )}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-[12px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="font-label-sm text-[10px] text-on-surface font-semibold">{product.rating}</span>
          <span className="font-body-sm text-[9px] text-on-surface-variant">({product.reviews})</span>
        </div>
      </div>
      <div className="p-2.5 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          <span className="font-label-sm text-[10px] text-secondary tracking-wider uppercase font-semibold">{product.tag}</span>
          <h2 className="font-headline-sm text-[15px] leading-tight text-on-surface font-semibold mt-0.5 line-clamp-1">
            {product.name}
          </h2>
          <p className="font-body-sm text-[11px] leading-snug text-on-surface-variant line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        <div className="pt-1 flex flex-col gap-2">
          <div className="flex items-baseline justify-between flex-wrap gap-1">
            <div className="flex items-baseline gap-1">
              <span className="font-currency-md text-currency-md text-on-surface font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="font-body-sm text-[11px] text-outline line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            <span className="font-label-sm text-[10px] text-primary bg-primary-fixed px-1.5 py-0.5 rounded-full font-bold">
              {product.discount}% OFF
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 h-8 rounded-full font-label-md text-[11px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all ${
                added ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{added ? 'check' : 'add'}</span>
              <span>{added ? 'Added!' : 'Add to Box'}</span>
            </button>
            <button
              onClick={handleMoveToWishlist}
              className={`flex-1 h-8 rounded-full border border-outline font-label-md text-[11px] flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 ${
                wishlistAdded ? 'bg-secondary text-on-secondary border-secondary' : 'text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">favorite</span>
              <span>{wishlistAdded ? 'Moved!' : 'Move to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
