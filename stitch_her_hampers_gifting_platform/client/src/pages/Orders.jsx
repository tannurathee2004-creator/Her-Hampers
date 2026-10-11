import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('her_hampers_orders') || '[]');
      setOrders(Array.isArray(saved) ? saved : []);
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold">My Orders</h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-0.5">Track your handcrafted hamper deliveries</p>
        </div>
        <Link to="/shop" className="text-primary font-label-md text-sm hover:underline flex items-center gap-1">
          <span>Explore Catalog</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-surface-container-lowest p-12 rounded-3xl text-center shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-[54px] text-primary mb-3">package_2</span>
          <h2 className="font-headline-sm text-on-surface mb-2">No orders placed yet</h2>
          <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-6">
            When you send a bespoke gift box to celebrate someone special, your orders and tracking will appear here.
          </p>
          <Link to="/shop" className="px-6 py-3 bg-primary text-on-primary rounded-full font-label-lg font-bold shadow-sm inline-block">
            Shop Hampers
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-outline-variant/30 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-base font-bold text-on-surface">Order #{order.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-label-sm font-semibold">
                      {order.status || 'Processing ✨'}
                    </span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Placed on {order.date}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-currency-md text-primary font-bold text-lg">₹{order.total?.toLocaleString('en-IN')}</span>
                  <p className="text-[11px] text-on-surface-variant">Payment: {order.paymentMethod || 'UPI'}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-surface-container-low overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline-sm text-sm font-semibold text-on-surface line-clamp-1">{item.name}</h4>
                      <p className="text-[12px] text-on-surface-variant">Qty: {item.quantity} • ₹{item.price?.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details */}
              <div className="pt-3 border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-on-surface-variant gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                  <span>Recipient: <strong className="text-on-surface">{order.recipient}</strong> ({order.address})</span>
                </div>
                {order.seal && (
                  <span className="text-secondary font-label-sm">
                    Wax Seal: {order.seal}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
