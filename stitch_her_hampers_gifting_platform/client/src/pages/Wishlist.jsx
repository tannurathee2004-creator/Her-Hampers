import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-display-sm text-on-surface mb-2">My Wishlist</h1>
      <p className="font-body-md text-on-surface-variant mb-8">
        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
      </p>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/30">
          <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[40px]">favorite</span>
          </div>
          <h2 className="font-headline-sm text-on-surface">Your wishlist is empty</h2>
          <p className="font-body-md text-on-surface-variant mt-2 mb-6 max-w-xs">
            Explore our curated collections and save your favorite hampers for later.
          </p>
          <Link to="/shop" className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-md hover:bg-primary/90 transition-colors">
            Explore Hampers
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
