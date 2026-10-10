import React from 'react';

export default function Settings() {
  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-display-sm text-on-surface mb-8">Settings</h1>
      <div className="bg-surface-container-lowest p-8 rounded-3xl text-center">
        <span className="material-symbols-outlined text-[48px] text-primary mb-4">settings</span>
        <h2 className="font-headline-md text-on-surface mb-2">Account Settings</h2>
        <p className="font-body-md text-on-surface-variant">Update your account preferences here.</p>
        <button className="mt-6 px-6 py-2 rounded-full border border-outline font-label-md text-label-md hover:bg-surface-container-high transition-colors">
          Log Out
        </button>
      </div>
    </div>
  );
}
