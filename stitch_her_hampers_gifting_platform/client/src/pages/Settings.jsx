import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';

export default function Settings() {
  const { isLoggedIn, profile, logout, login, loginAsDemo } = useUser();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  // Modals & Feedback
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Custom login form state
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // User Preferences
  const [prefs, setPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem('her_hampers_user_preferences');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      orderUpdates: true,
      whatsappAlerts: true,
      giftReminders: true,
      newsletter: false,
      expressCheckout: true,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('her_hampers_user_preferences', JSON.stringify(prefs));
    } catch (err) {
      console.error('Failed to save preferences', err);
    }
  }, [prefs]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleTogglePref = (key) => {
    setPrefs(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Preference updated ✨');
      return updated;
    });
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    showToast('You have been logged out successfully. See you again soon! ✨', 'info');
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    setShowLoginModal(false);
    showToast('Welcome back, Ananya! Logged in successfully ✨', 'success');
  };

  const handleCustomLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.name.trim()) return;
    login({
      name: loginForm.name.trim(),
      email: loginForm.email.trim() || 'user@example.com',
      phone: loginForm.phone.trim() || '+91 98765 00000',
    });
    setShowLoginModal(false);
    showToast(`Welcome back, ${loginForm.name}! Logged in successfully ✨`, 'success');
  };

  const handleClearLocalCache = () => {
    clearCart();
    showToast('Cart and temporary browsing data cleared ✨', 'info');
  };

  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      {/* Toast Notification */}
      {toast && (
        <div
          id="settings-toast"
          className="fixed top-24 right-4 z-50 max-w-sm px-5 py-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_8px_30px_rgba(72,52,65,0.12)] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              toast.type === 'success' ? 'text-primary' : 'text-secondary'
            }`}
          >
            {toast.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span className="font-body-sm text-sm text-on-surface font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/profile" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 text-xs font-label-sm">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              My Account
            </Link>
            <span className="text-outline-variant">•</span>
            <span className="text-xs font-label-sm text-primary font-semibold">Settings</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold">
            Settings & Preferences
          </h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-0.5">
            Manage your account security, notification alerts, and active login session
          </p>
        </div>

        {/* Quick status badge */}
        <div className="self-start sm:self-auto">
          {isLoggedIn ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-label-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Session
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-label-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Signed Out
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Account Status Card */}
        {isLoggedIn ? (
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(72,52,65,0.06)] border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-2xl shadow-sm">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : 'H'}
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="font-headline-sm text-lg text-on-surface font-bold">
                    {profile?.name || 'Her Hampers Member'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider">
                    Member
                  </span>
                </div>
                <p className="font-body-sm text-sm text-on-surface-variant mt-0.5">
                  {profile?.email || 'No email associated'}
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant/80 mt-0.5">
                  {profile?.phone || 'No phone number'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="px-5 py-2.5 rounded-full border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-md text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Edit Profile
              </Link>
              <button
                id="header-logout-shortcut"
                onClick={() => setShowLogoutModal(true)}
                className="px-5 py-2.5 rounded-full border border-error/30 text-error hover:bg-error-container/20 font-label-md text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(72,52,65,0.06)] border border-outline-variant/30 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">lock_person</span>
            </div>
            <h2 className="font-headline-sm text-xl text-on-surface mb-2 font-bold">
              You are currently signed out
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-6 text-sm">
              Sign in to your Her Hampers account to access saved delivery addresses, review your past orders, and enjoy effortless checkout.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="login-demo-btn"
                onClick={handleDemoLogin}
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Sign In as Ananya Sharma (Demo)
              </button>
              <button
                id="login-custom-btn"
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-2.5 rounded-full border border-outline font-label-md text-sm text-on-surface hover:bg-surface-container-high transition-all"
              >
                Sign In with Other Email
              </button>
            </div>
          </div>
        )}

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/addresses"
            className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 transition-all group flex items-center gap-3 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </div>
            <div>
              <h3 className="font-label-md text-sm text-on-surface font-semibold">Delivery Addresses</h3>
              <p className="font-body-sm text-xs text-on-surface-variant">Manage saved destinations</p>
            </div>
          </Link>

          <Link
            to="/orders"
            className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 transition-all group flex items-center gap-3 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">package_2</span>
            </div>
            <div>
              <h3 className="font-label-md text-sm text-on-surface font-semibold">Order History</h3>
              <p className="font-body-sm text-xs text-on-surface-variant">Track ongoing deliveries</p>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 transition-all group flex items-center gap-3 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </div>
            <div>
              <h3 className="font-label-md text-sm text-on-surface font-semibold">Saved Hampers</h3>
              <p className="font-body-sm text-xs text-on-surface-variant">View your wishlist</p>
            </div>
          </Link>
        </div>

        {/* Notifications & Preferences Card */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(72,52,65,0.06)] border border-outline-variant/30">
          <div className="flex items-center gap-2.5 pb-4 border-b border-outline-variant/30 mb-6">
            <span className="material-symbols-outlined text-primary text-[24px]">notifications_active</span>
            <div>
              <h2 className="font-headline-sm text-lg text-on-surface font-bold">Alerts & Communication</h2>
              <p className="font-body-sm text-xs text-on-surface-variant">Choose how we keep in touch regarding your gifts</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* WhatsApp Updates */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-sm text-on-surface font-semibold">WhatsApp Delivery Alerts</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Recommended</span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Receive live dispatch updates, tracking links, and delivery confirmation photos.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs.whatsappAlerts}
                onClick={() => handleTogglePref('whatsappAlerts')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  prefs.whatsappAlerts ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    prefs.whatsappAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Order Tracking SMS */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-outline-variant/20">
              <div>
                <span className="font-label-md text-sm text-on-surface font-semibold">SMS Status Notifications</span>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Get text messages for essential milestones like order confirmation and courier handover.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs.orderUpdates}
                onClick={() => handleTogglePref('orderUpdates')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  prefs.orderUpdates ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    prefs.orderUpdates ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Gifting Occasions Reminder */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-outline-variant/20">
              <div>
                <span className="font-label-md text-sm text-on-surface font-semibold">Festive & Occasion Reminders</span>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Get gentle reminders 7 days prior to Rakhi, Diwali, Valentine’s, and Women’s Day.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs.giftReminders}
                onClick={() => handleTogglePref('giftReminders')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  prefs.giftReminders ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    prefs.giftReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Newsletter */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-outline-variant/20">
              <div>
                <span className="font-label-md text-sm text-on-surface font-semibold">New Hamper Drops & Secret Offers</span>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Occasional email digest featuring freshly curated luxury hampers and subscriber-exclusive discounts.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs.newsletter}
                onClick={() => handleTogglePref('newsletter')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  prefs.newsletter ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    prefs.newsletter ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Storage */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(72,52,65,0.06)] border border-outline-variant/30">
          <div className="flex items-center gap-2.5 pb-4 border-b border-outline-variant/30 mb-6">
            <span className="material-symbols-outlined text-primary text-[24px]">tune</span>
            <div>
              <h2 className="font-headline-sm text-lg text-on-surface font-bold">Storage & Checkout Convenience</h2>
              <p className="font-body-sm text-xs text-on-surface-variant">Control stored cookies and cached hamper selections</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
            <div>
              <span className="font-label-md text-sm text-on-surface font-semibold">Express Auto-Fill at Checkout</span>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                Automatically pre-fill your saved address and contact info when ordering gifts.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.expressCheckout}
              onClick={() => handleTogglePref('expressCheckout')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                prefs.expressCheckout ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  prefs.expressCheckout ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-label-md text-sm text-on-surface font-semibold">Clear Shopping Cart & Browsing Cache</span>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                Reset your active bag items without touching your account profile or past orders.
              </p>
            </div>
            <button
              type="button"
              id="clear-cart-cache-btn"
              onClick={handleClearLocalCache}
              className="px-4 py-2 rounded-full border border-outline-variant text-on-surface font-label-md text-xs hover:bg-surface-container transition-all self-start sm:self-auto shrink-0"
            >
              Clear Cart Cache
            </button>
          </div>
        </div>

        {/* Account Session / Danger Zone */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(72,52,65,0.06)] border border-error/20">
          <div className="flex items-center gap-2.5 pb-4 border-b border-error/20 mb-6">
            <span className="material-symbols-outlined text-error text-[24px]">power_settings_new</span>
            <div>
              <h2 className="font-headline-sm text-lg text-on-surface font-bold">Account Session & Security</h2>
              <p className="font-body-sm text-xs text-on-surface-variant">Sign out of this device or switch to a different account</p>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-label-md text-sm text-on-surface font-semibold">Active Session</span>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Logged in as <strong className="text-on-surface">{profile?.name || 'Ananya Sharma'}</strong> ({profile?.email || 'ananya.sharma@example.com'}).
                  Signing out ends your session on this device.
                </p>
              </div>
              <button
                id="logout-button"
                onClick={() => setShowLogoutModal(true)}
                className="px-6 py-2.5 rounded-full bg-error/10 border border-error/40 text-error hover:bg-error hover:text-white font-label-md text-sm font-semibold transition-all shadow-sm active:scale-95 flex items-center gap-2 self-start sm:self-auto shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-label-md text-sm text-on-surface font-semibold">Currently Logged Out</span>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  You are not currently logged into any account.
                </p>
              </div>
              <button
                id="session-login-btn"
                onClick={handleDemoLogin}
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-95 flex items-center gap-2 self-start sm:self-auto shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                Log In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Logout */}
      {showLogoutModal && (
        <div
          id="logout-modal"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="bg-surface-container-lowest max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-[0_16px_48px_rgba(72,52,65,0.2)] border border-outline-variant/30 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-error-container text-error flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">logout</span>
            </div>
            <h3 className="font-headline-sm text-xl text-on-surface mb-2 font-bold">
              Log Out of Her Hampers?
            </h3>
            <p className="font-body-md text-on-surface-variant text-sm mb-6 leading-relaxed">
              Are you sure you want to log out? Your saved addresses and placed orders will remain safe, and you can log back in whenever you are ready.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                id="cancel-logout-btn"
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-5 py-2.5 rounded-full border border-outline-variant font-label-md text-sm text-on-surface hover:bg-surface-container transition-all"
              >
                Cancel
              </button>
              <button
                id="confirm-logout-btn"
                type="button"
                onClick={handleLogoutConfirm}
                className="flex-1 px-5 py-2.5 rounded-full bg-error text-white font-label-md text-sm font-semibold hover:bg-error/90 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showLoginModal && (
        <div
          id="login-modal"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-surface-container-lowest max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-[0_16px_48px_rgba(72,52,65,0.2)] border border-outline-variant/30 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30 mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">account_circle</span>
                <h3 className="font-headline-sm text-lg text-on-surface font-bold">Sign In to Your Account</h3>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCustomLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Patel"
                  value={loginForm.name}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-label-sm text-on-surface-variant mb-1 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-95"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2 rounded-full border border-outline-variant font-label-md text-xs text-on-surface hover:bg-surface-container transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
                  Or Use Demo Account (Ananya Sharma)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
