import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <div className="pt-24 px-margin pb-32 max-w-7xl mx-auto min-h-screen flex flex-col">
      <h1 className="font-display text-display-sm text-on-surface mb-6">Your Box</h1>
      
      <div className="flex-1 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=300&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-headline-sm text-[16px] text-on-surface">Curated Self-Care Hamper</h3>
              <p className="font-body-sm text-on-surface-variant text-[12px] mt-1">1 x ₹1,499</p>
            </div>
            <button className="text-error w-8 h-8 flex items-center justify-center rounded-full hover:bg-error-container/20">
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
          {/* Add more items here if needed */}
        </div>

        <div className="w-full md:w-80 bg-surface-container-lowest p-6 rounded-3xl shadow-sm h-fit">
          <h2 className="font-headline-sm text-[18px] text-on-surface mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 font-body-md">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span>₹1,499</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Delivery</span>
              <span className="text-primary">Free</span>
            </div>
          </div>
          <div className="border-t border-outline-variant pt-4 mb-6">
            <div className="flex justify-between font-headline-sm text-on-surface">
              <span>Total</span>
              <span>₹1,499</span>
            </div>
          </div>
          <button className="w-full bg-primary text-on-primary py-3 rounded-full font-label-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
