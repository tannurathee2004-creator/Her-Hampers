import React, { useState } from 'react';

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setAddresses([...addresses, newAddress]);
      setNewAddress('');
      setIsAdding(false);
    }
  };

  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-display-sm text-on-surface mb-8">Addresses</h1>
      <div className="bg-surface-container-lowest p-8 rounded-3xl text-center">
        {!isAdding && addresses.length === 0 && (
          <>
            <span className="material-symbols-outlined text-[48px] text-primary mb-4">location_on</span>
            <h2 className="font-headline-md text-on-surface mb-2">No saved addresses</h2>
            <p className="font-body-md text-on-surface-variant">Add an address to speed up checkout.</p>
            <button 
              onClick={() => setIsAdding(true)}
              className="mt-6 px-6 py-2 rounded-full border border-outline font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              Add New Address
            </button>
          </>
        )}

        {!isAdding && addresses.length > 0 && (
          <div className="text-left max-w-md mx-auto flex flex-col gap-4">
            {addresses.map((address, index) => (
              <div key={index} className="p-4 border border-outline-variant rounded-xl bg-surface-container-low">
                <p className="font-body-md text-on-surface">{address}</p>
              </div>
            ))}
            <button 
              onClick={() => setIsAdding(true)}
              className="mt-4 px-6 py-2 rounded-full border border-outline font-label-md text-label-md hover:bg-surface-container-high transition-colors self-start"
            >
              Add Another Address
            </button>
          </div>
        )}

        {isAdding && (
          <div className="max-w-md mx-auto text-left flex flex-col gap-4">
            <h2 className="font-headline-md text-on-surface">Enter New Address</h2>
            <textarea
              className="w-full p-4 rounded-xl border border-outline bg-surface-container-low text-on-surface focus:outline-none focus:border-primary resize-none h-32"
              placeholder="e.g. 123 Main St, Apt 4B, City, Country, ZIP"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <div className="flex gap-2">
              <button 
                onClick={handleAddAddress}
                className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-md hover:bg-primary/90 transition-colors"
              >
                Save Address
              </button>
              <button 
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 rounded-full border border-outline font-label-md text-on-surface hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
