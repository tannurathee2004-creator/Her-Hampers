import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import indiaStatesAndCities from '../data/indiaStatesAndCities.json';

const statesList = Object.keys(indiaStatesAndCities);

export default function Addresses() {
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [newAddr, setNewAddr] = useState({
    tag: 'Home',
    address: '',
    state: 'Maharashtra',
    city: 'Mumbai',
    pincode: '',
  });

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const availableCities = indiaStatesAndCities[newState] || [];
    setNewAddr(prev => ({
      ...prev,
      state: newState,
      city: availableCities[0] || '',
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.address.trim()) return;

    addAddress(newAddr);
    setNewAddr({
      tag: 'Home',
      address: '',
      state: 'Maharashtra',
      city: 'Mumbai',
      pincode: '',
    });
    setIsAdding(false);
  };

  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold">
            Saved Delivery Addresses
          </h1>
          <p className="font-body-md text-on-surface-variant mt-1">
            Addresses are automatically saved and pre-filled when you order.
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md hover:bg-primary/90 transition-all shadow-sm w-fit"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add New Address
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/30 mb-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <h2 className="font-headline-sm text-[18px] text-on-surface font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_location_alt</span>
              Add New Address
            </h2>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">Address Label / Tag</label>
              <select
                value={newAddr.tag}
                onChange={(e) => setNewAddr({ ...newAddr, tag: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
              >
                <option value="Home">Home</option>
                <option value="Work / Office">Work / Office</option>
                <option value="Parents">Parents</option>
                <option value="Friend">Friend / Bestie</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">Street Address, Flat / Villa No. *</label>
              <input
                type="text"
                required
                placeholder="e.g. Apt 402, Lotus Orchid, Palm Avenue"
                value={newAddr.address}
                onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">State / UT *</label>
              <select
                value={newAddr.state}
                onChange={handleStateChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm cursor-pointer"
              >
                {statesList.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">City *</label>
              <select
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm cursor-pointer"
              >
                {(indiaStatesAndCities[newAddr.state] || []).map(ct => (
                  <option key={ct} value={ct}>{ct}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-label-sm text-[12px] text-on-surface-variant mb-1 font-semibold">PIN Code *</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="e.g. 400050"
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-semibold hover:bg-primary/90 transition-all shadow-sm"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-6 py-2.5 rounded-full border border-outline-variant text-on-surface font-label-md hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Address cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length === 0 ? (
          <div className="col-span-full bg-surface-container-lowest p-12 rounded-3xl text-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-primary mb-3">location_off</span>
            <h2 className="font-headline-sm text-on-surface mb-2">No saved addresses yet</h2>
            <p className="font-body-md text-on-surface-variant max-w-sm mx-auto mb-6">
              Saved addresses make it seamless to send gifts and hampers in just a few taps.
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-semibold hover:bg-primary/90 transition-all"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 rounded-3xl border transition-all relative flex flex-col justify-between ${
                addr.isDefault
                  ? 'bg-secondary-fixed/20 border-secondary/40 shadow-sm'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-[12px] font-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      {addr.tag === 'Home' ? 'home' : addr.tag === 'Work / Office' ? 'apartment' : 'pin_drop'}
                    </span>
                    {addr.tag}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[11px] font-label-sm text-secondary font-bold uppercase tracking-wider bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full">
                      Default Shipping
                    </span>
                  )}
                </div>
                <p className="font-body-md text-on-surface font-medium mb-1">
                  {addr.address}
                </p>
                <p className="font-body-sm text-on-surface-variant">
                  {addr.city}, {addr.state} {addr.pincode ? `– ${addr.pincode}` : ''}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-outline-variant/20">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[12px] font-label-sm text-primary hover:underline font-semibold"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-[12px] font-label-sm text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Selected
                  </span>
                )}
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-on-surface-variant hover:text-error text-xs flex items-center gap-1 transition-colors"
                  title="Delete address"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
