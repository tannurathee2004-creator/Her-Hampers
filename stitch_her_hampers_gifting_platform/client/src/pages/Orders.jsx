import React from 'react';

export default function Orders() {
  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-display-sm text-on-surface mb-8">My Orders</h1>
      <div className="bg-surface-container-lowest p-8 rounded-3xl text-center">
        <span className="material-symbols-outlined text-[48px] text-primary mb-4">package_2</span>
        <h2 className="font-headline-md text-on-surface mb-2">No orders yet</h2>
        <p className="font-body-md text-on-surface-variant">When you place orders, they will appear here.</p>
      </div>
    </div>
  );
}
