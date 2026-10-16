import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import indiaStatesAndCities from '../data/indiaStatesAndCities.json';

const statesList = Object.keys(indiaStatesAndCities);

export default function Profile() {
  const { profile, updateProfile, isLoggedIn, loginAsDemo } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const availableCities = indiaStatesAndCities[newState] || [];
    setFormData(prev => ({
      ...prev,
      state: newState,
      city: availableCities[0] || '',
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold">My Account</h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-0.5">Manage your saved details, orders, and addresses</p>
        </div>
        {saveToast && (
          <div className="px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-label-sm font-semibold flex items-center gap-1.5 shadow-sm animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
            Details saved automatically! ✨
          </div>
        )}
      </div>
      
      {/* Profile Card */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(72,52,65,0.06)] border border-outline-variant/30 mb-8">
        {!isLoggedIn ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">lock_person</span>
            </div>
            <h2 className="font-headline-sm text-xl text-on-surface mb-2 font-bold">
              You are signed out
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-6 text-sm">
              Sign in to view and edit your profile details, auto-fill your delivery addresses at checkout, and track orders.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={loginAsDemo}
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Sign In as Ananya Sharma (Demo)
              </button>
              <Link
                to="/settings"
                className="px-6 py-2.5 rounded-full border border-outline font-label-md text-sm text-on-surface hover:bg-surface-container-high transition-all"
              >
                Sign In Options in Settings
              </Link>
            </div>
          </div>
        ) : !isEditing ? (
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-outline-variant/30">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-md text-on-primary">
                <span className="material-symbols-outlined text-[42px]">person</span>
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-headline-sm text-xl text-on-surface font-semibold">{profile.name || 'Her Hampers Member'}</h2>
                    <p className="font-body-md text-on-surface-variant text-sm mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                      {profile.email || 'No email saved yet'}
                    </p>
                    <p className="font-body-md text-on-surface-variant text-sm mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">phone</span>
                      {profile.phone || 'No phone saved yet'}
                    </p>
                  </div>
                  <button 
                    onClick={() => { setFormData(profile); setIsEditing(true); }}
                    className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-sm hover:bg-primary/90 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5 self-center sm:self-start"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Delivery Info Bar */}
            <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                <div>
                  <span className="text-[11px] font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Primary Delivery Address (Auto-Fills at Checkout)
                  </span>
                  <p className="font-body-sm text-sm text-on-surface mt-0.5 font-medium">
                    {profile.address ? `${profile.address}, ${profile.city}, ${profile.state} - ${profile.pincode}` : 'No address saved yet. Click Edit Profile to add one!'}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-label-sm text-secondary bg-secondary-fixed/30 px-3 py-1 rounded-full font-bold self-start sm:self-center">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                Express Auto-Fill Active
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h2 className="font-headline-sm text-lg text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">manage_accounts</span>
                Edit Profile & Delivery Details
              </h2>
              <span className="text-xs text-on-surface-variant">Auto-saves for all future orders</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">Street Address, Apt / Villa *</label>
              <textarea
                name="address"
                required
                rows={2}
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">State / UT *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm cursor-pointer"
                >
                  {statesList.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">City *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm cursor-pointer"
                >
                  {(indiaStatesAndCities[formData.state] || []).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                Save Profile Details
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-full border border-outline-variant font-label-md text-sm text-on-surface hover:bg-surface-container transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
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
