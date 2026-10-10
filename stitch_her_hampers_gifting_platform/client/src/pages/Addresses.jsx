import React from 'react';

export default function Addresses() {
  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-display-sm text-on-surface mb-8">Addresses</h1>
      <div className="bg-surface-container-lowest p-8 rounded-3xl text-center">
        <span className="material-symbols-outlined text-[48px] text-primary mb-4">location_on</span>
        <h2 className="font-headline-md text-on-surface mb-2">No saved addresses</h2>
        <p className="font-body-md text-on-surface-variant">Add an address to speed up checkout.</p>
        <button className="mt-6 px-6 py-2 rounded-full border border-outline font-label-md text-label-md hover:bg-surface-container-high transition-colors">
          Add New Address
        </button>
      </div>
    </div>
  );
}
