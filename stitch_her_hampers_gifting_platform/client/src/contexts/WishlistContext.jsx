import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('her_hampers_wishlist');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('her_hampers_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const current = Array.isArray(prev) ? prev : [];
      const isExisting = current.some(item => item?.id === product?.id);
      if (isExisting) {
        return current.filter(item => item?.id !== product?.id);
      }
      return [...current, product];
    });
  };

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      const current = Array.isArray(prev) ? prev : [];
      const isExisting = current.some(item => item?.id === product?.id);
      if (isExisting) return current;
      return [...current, product];
    });
  };

  const isInWishlist = (productId) => {
    const current = Array.isArray(wishlistItems) ? wishlistItems : [];
    return current.some(item => item?.id === productId);
  };

  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, addToWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
