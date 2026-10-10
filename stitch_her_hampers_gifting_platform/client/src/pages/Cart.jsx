import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { addToWishlist } = useWishlist();

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  return (
    <div className="pt-24 px-margin pb-32 max-w-7xl mx-auto min-h-screen flex flex-col">
      <h1 className="font-display text-display-sm text-on-surface mb-6">Your Box</h1>
      
      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant">shopping_bag</span>
          <div>
            <h2 className="font-headline-sm text-on-surface">Your box is empty</h2>
            <p className="font-body-md text-on-surface-variant mt-2">Looks like you haven't added any hampers yet.</p>
          </div>
          <Link to="/shop" className="mt-4 px-6 py-3 bg-primary text-on-primary rounded-full font-label-lg font-bold">
            Shop Hampers
          </Link>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm flex items-center gap-4">
                <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline-sm text-[16px] text-on-surface">{item.name}</h3>
                  <p className="font-body-sm text-on-surface-variant text-[12px] mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  
                  {item.personalizedNote && (
                    <div className="mt-2 bg-secondary-container/30 rounded-lg p-2 flex items-start gap-1.5 border border-secondary/10">
                      <span className="material-symbols-outlined text-[14px] text-secondary mt-0.5">draw</span>
                      <p className="font-body-sm text-[11px] text-on-surface italic line-clamp-2">
                        "{item.personalizedNote}"
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mt-3 bg-surface-container w-fit rounded-full px-1 py-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-lowest shadow-sm text-on-surface">
                      <span className="material-symbols-outlined text-[14px]">remove</span>
                    </button>
                    <span className="font-label-md text-on-surface min-w-[12px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-lowest shadow-sm text-on-surface">
                      <span className="material-symbols-outlined text-[14px]">add</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 self-start">
                  <button onClick={() => removeFromCart(item.id)} className="text-error w-8 h-8 flex items-center justify-center rounded-full hover:bg-error-container/20">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                  <button onClick={() => handleMoveToWishlist(item)} className="text-primary text-[12px] font-label-md hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">favorite</span>
                    Move to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-80 bg-surface-container-lowest p-6 rounded-3xl shadow-sm h-fit">
            <h2 className="font-headline-sm text-[18px] text-on-surface mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 font-body-md">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Delivery</span>
                <span className="text-primary">Free</span>
              </div>
            </div>
            <div className="border-t border-outline-variant pt-4 mb-6">
              <div className="flex justify-between font-headline-sm text-on-surface">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button className="w-full bg-primary text-on-primary py-3 rounded-full font-label-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
