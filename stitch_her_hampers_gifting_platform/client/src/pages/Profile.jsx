export default function Profile() {
  return (
    <div className="pt-24 px-margin pb-32 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-display-sm text-on-surface mb-8">My Account</h1>
      
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(72,52,65,0.06)] flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined text-[48px] text-on-primary">person</span>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="font-headline-md text-on-surface">Guest User</h2>
          <p className="font-body-md text-on-surface-variant mt-1">guest@example.com</p>
          <button className="mt-4 px-6 py-2 rounded-full border border-outline font-label-md text-label-md hover:bg-surface-container-high transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">package_2</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">My Orders</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">Track, return, or buy things again</p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">favorite</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">Wishlist</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">View your saved hampers</p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">Addresses</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">Manage delivery addresses</p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">settings</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">Settings</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">Account settings and preferences</p>
        </div>
      </div>
    </div>
  );
}
