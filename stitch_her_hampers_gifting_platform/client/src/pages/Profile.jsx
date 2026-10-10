import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Guest User');

  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-display-sm text-on-surface mb-8">My Account</h1>
      
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(72,52,65,0.06)] flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined text-[48px] text-on-primary">person</span>
        </div>
        <div className="text-center sm:text-left flex-1">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mt-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 h-10 px-4 rounded-full bg-surface-container-high outline-none font-body-md text-on-surface"
              />
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 h-10 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-headline-md text-on-surface">{userName}</h2>
              <p className="font-body-md text-on-surface-variant mt-1">guest@example.com</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-4 px-6 py-2 rounded-full border border-outline font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/orders" className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">package_2</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">My Orders</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">Track, return, or buy things again</p>
        </Link>

        <Link to="/wishlist" className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">favorite</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">Wishlist</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">View your saved hampers</p>
        </Link>

        <Link to="/addresses" className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">Addresses</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">Manage delivery addresses</p>
        </Link>

        <Link to="/settings" className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">settings</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">Settings</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">Account settings and preferences</p>
        </Link>
      </div>
    </div>
  );
}
