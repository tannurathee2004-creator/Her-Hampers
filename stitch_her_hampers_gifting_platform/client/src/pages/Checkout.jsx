import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    recipientName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Mumbai',
    pincode: '',
    deliverySlot: 'standard', // 'standard' | 'midnight'
    waxSealColor: 'Burgundy Rose',
    personalizedNote: '',
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.recipientName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in the recipient name, phone, and delivery address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `HH-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cartItems],
        total: cartTotal + (formData.deliverySlot === 'midnight' ? 199 : 0),
        status: 'Preparing with Love ✨',
        recipient: formData.recipientName,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        deliverySlot: formData.deliverySlot === 'midnight' ? 'Midnight Delivery (11:30 PM - 12:00 AM)' : 'Standard Express Delivery (Same-Day)',
        note: formData.personalizedNote,
        seal: formData.waxSealColor,
        paymentMethod: formData.paymentMethod.toUpperCase(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('her_hampers_orders') || '[]');
        localStorage.setItem('her_hampers_orders', JSON.stringify([newOrder, ...existing]));
      } catch (err) {
        console.error('Failed to save order to localStorage', err);
      }

      clearCart();
      setIsSubmitting(false);
      setOrderSuccess(newOrder);
    }, 1200);
  };

  if (orderSuccess) {
    return (
      <div className="pt-24 px-margin pb-32 max-w-2xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-secondary-fixed/50 rounded-full flex items-center justify-center mb-6 shadow-sm animate-bounce">
          <span className="material-symbols-outlined text-primary text-[42px]">check_circle</span>
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider mb-2">
          Order Confirmed • Handcrafted in India
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold mb-2">
          Thank you for celebrating her!
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-6">
          Your bespoke gift box <span className="font-bold text-primary">#{orderSuccess.id}</span> is being lovingly packed with satin ribbons and your personalized card.
        </p>

        {/* Order Card Preview */}
        <div className="w-full bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/30 text-left mb-8 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40">
            <div>
              <span className="text-[11px] font-label-sm uppercase text-on-surface-variant">Recipient</span>
              <p className="font-headline-sm text-sm font-semibold text-on-surface">{orderSuccess.recipient}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-label-sm uppercase text-on-surface-variant">Order Total</span>
              <p className="font-currency-md text-primary font-bold">₹{orderSuccess.total.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-label-sm uppercase text-on-surface-variant">Delivery Slot</span>
            <p className="font-body-sm text-on-surface flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
              {orderSuccess.deliverySlot}
            </p>
          </div>
          {orderSuccess.note && (
            <div className="bg-surface-container-low rounded-2xl p-3 border border-secondary/10">
              <span className="text-[11px] font-label-sm uppercase text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">edit_note</span>
                Wax-Sealed Note ({orderSuccess.seal})
              </span>
              <p className="font-body-sm text-on-surface-variant italic mt-1">"{orderSuccess.note}"</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Link
            to="/orders"
            className="flex-1 py-3.5 px-6 rounded-full bg-primary text-on-primary font-label-lg font-bold shadow-md hover:bg-primary/90 transition-all text-center"
          >
            Track in My Orders
          </Link>
          <Link
            to="/shop"
            className="flex-1 py-3.5 px-6 rounded-full bg-surface-container-lowest text-on-surface border border-outline-variant font-label-lg font-semibold hover:bg-surface-container transition-all text-center"
          >
            Explore More Hampers
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 px-margin pb-32 max-w-2xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">shopping_bag</span>
        <h2 className="font-headline-sm text-on-surface">Your box is empty</h2>
        <p className="font-body-md text-on-surface-variant mt-2 mb-6">Add a handcrafted hamper to your box before checking out.</p>
        <Link to="/shop" className="px-6 py-3 bg-primary text-on-primary rounded-full font-label-lg font-bold">
          Shop Hampers
        </Link>
      </div>
    );
  }

  const shippingFee = formData.deliverySlot === 'midnight' ? 199 : 0;
  const finalTotal = cartTotal + shippingFee;

  return (
    <div className="pt-24 px-margin pb-32 max-w-6xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <Link to="/cart" className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-label-sm mb-2 transition-colors">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Your Box
        </Link>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold">
          Checkout & Delivery
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Complete recipient details and handwritten note for her gift box.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
        {/* Left Form: Delivery & Gifting Details */}
        <div className="flex-1 space-y-6">
          {/* Section 1: Recipient Information */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/30 space-y-4">
            <h2 className="font-headline-sm text-[18px] text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">person</span>
              1. Recipient & Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">Recipient Full Name *</label>
                <input
                  type="text"
                  name="recipientName"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">Contact Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">Sender Email (for order confirmation)</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          {/* Section 2: Delivery Address & City */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-[18px] text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                2. Shipping Destination
              </h2>
              <span className="text-[11px] font-label-sm text-secondary bg-secondary-fixed/40 px-2 py-0.5 rounded-full font-bold">
                Same-Day Available
              </span>
            </div>
            <div>
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">Street Address, Flat / Villa No. *</label>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="e.g. Apt 402, Lotus Orchid, Palm Avenue"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                >
                  <option value="Mumbai">Mumbai (Same-Day)</option>
                  <option value="Delhi NCR">Delhi NCR (Same-Day)</option>
                  <option value="Bangalore">Bangalore (Same-Day)</option>
                  <option value="Pune">Pune (Next-Day)</option>
                  <option value="Hyderabad">Hyderabad (Next-Day)</option>
                  <option value="Other">Other Metro Cities</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">PIN Code</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="e.g. 400050"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            {/* Delivery Slot Choice */}
            <div className="pt-2">
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-2 font-semibold">Select Delivery Slot</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.deliverySlot === 'standard' ? 'border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant bg-surface-container-low'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliverySlot"
                      value="standard"
                      checked={formData.deliverySlot === 'standard'}
                      onChange={handleInputChange}
                      className="accent-primary"
                    />
                    <div>
                      <p className="font-label-md text-xs font-bold text-on-surface">Standard Express</p>
                      <p className="text-[11px] text-on-surface-variant">Same-Day / Next-Day Delivery</p>
                    </div>
                  </div>
                  <span className="font-label-sm text-[11px] text-primary font-bold">FREE</span>
                </label>

                <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.deliverySlot === 'midnight' ? 'border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant bg-surface-container-low'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliverySlot"
                      value="midnight"
                      checked={formData.deliverySlot === 'midnight'}
                      onChange={handleInputChange}
                      className="accent-primary"
                    />
                    <div>
                      <p className="font-label-md text-xs font-bold text-on-surface">Midnight Surprise ✨</p>
                      <p className="text-[11px] text-on-surface-variant">11:30 PM - 12:00 AM Slot</p>
                    </div>
                  </div>
                  <span className="font-label-sm text-[11px] text-primary font-bold">₹199</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Personalized Wax-Seal Love Note */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-[18px] text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">draw</span>
                3. Complimentary Wax-Sealed Note
              </h2>
              <span className="text-[11px] font-label-sm text-primary font-bold">FREE WITH BOX</span>
            </div>
            <div>
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">
                Your Handwritten Message for Her
              </label>
              <textarea
                name="personalizedNote"
                rows={3}
                placeholder="Write your heartfelt wish or sentiment here. Our calligraphy artist will handwrite this on deckled-edge paper..."
                value={formData.personalizedNote}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm resize-none"
              />
            </div>
            <div>
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1.5 font-semibold">Choose Wax Seal Wax Stamp</label>
              <div className="flex gap-2">
                {['Burgundy Rose', 'Antique Gold', 'Blush Petal'].map(seal => (
                  <button
                    key={seal}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, waxSealColor: seal }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-label-sm transition-all ${
                      formData.waxSealColor === seal
                        ? 'bg-primary text-on-primary font-bold shadow-sm'
                        : 'bg-surface-container-low text-on-surface border border-outline-variant'
                    }`}
                  >
                    ✨ {seal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/30 space-y-4">
            <h2 className="font-headline-sm text-[18px] text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
              4. Payment Method
            </h2>
            <div className="space-y-2.5">
              <label className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                formData.paymentMethod === 'upi' ? 'border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant bg-surface-container-low'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="accent-primary"
                  />
                  <div>
                    <p className="font-label-md text-sm font-bold text-on-surface">UPI / Instant QR</p>
                    <p className="text-[11px] text-on-surface-variant">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary text-[20px]">qr_code_2</span>
              </label>

              <label className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                formData.paymentMethod === 'card' ? 'border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant bg-surface-container-low'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="accent-primary"
                  />
                  <div>
                    <p className="font-label-md text-sm font-bold text-on-surface">Credit / Debit Card</p>
                    <p className="text-[11px] text-on-surface-variant">Visa, Mastercard, RuPay, Amex</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">credit_card</span>
              </label>

              <label className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                formData.paymentMethod === 'cod' ? 'border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant bg-surface-container-low'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="accent-primary"
                  />
                  <div>
                    <p className="font-label-md text-sm font-bold text-on-surface">Cash / Pay on Delivery</p>
                    <p className="text-[11px] text-on-surface-variant">Pay when the surprise box arrives</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">local_atm</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/30 sticky top-28">
            <h2 className="font-headline-sm text-[18px] text-on-surface mb-4">Box Summary</h2>

            {/* Cart Items Preview */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 no-scrollbar mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-outline-variant/30">
                  <div className="w-14 h-14 rounded-xl bg-surface-container-low overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-headline-sm text-xs font-semibold text-on-surface line-clamp-1">{item.name}</h4>
                    <p className="text-[11px] text-on-surface-variant">Qty: {item.quantity}</p>
                    <p className="font-currency-md text-xs text-primary font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 mb-4 font-body-sm text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Hampers Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Express Shipping</span>
                <span className="text-primary font-semibold">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Satin Ribbon & Keepsake Box</span>
                <span className="text-secondary font-semibold">Included</span>
              </div>
            </div>

            <div className="border-t border-outline-variant pt-3 mb-6">
              <div className="flex justify-between font-headline-sm text-on-surface text-base">
                <span>Grand Total</span>
                <span className="font-currency-md text-primary font-bold text-lg">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Includes all taxes & delivery handling</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-on-primary py-3.5 rounded-full font-label-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(158,56,78,0.3)] disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  <span>Securing Your Surprise...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  <span>Place Order • ₹{finalTotal.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-center gap-3 text-[11px] text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                100% Safe Checkout
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">local_florist</span>
                Fresh Handcrafted
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
