import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const DEFAULT_PROFILE = {
  name: 'Ananya Sharma',
  phone: '+91 98765 43210',
  email: 'ananya.sharma@example.com',
  address: 'Apt 402, Lotus Orchid, Palm Avenue',
  state: 'Maharashtra',
  city: 'Mumbai',
  pincode: '400050',
};

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('her_hampers_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROFILE, ...parsed };
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('her_hampers_addresses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [
        {
          id: 1,
          tag: 'Home',
          address: DEFAULT_PROFILE.address,
          city: DEFAULT_PROFILE.city,
          state: DEFAULT_PROFILE.state,
          pincode: DEFAULT_PROFILE.pincode,
          isDefault: true,
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('her_hampers_user_profile', JSON.stringify(profile));
    } catch (err) {
      console.error('Failed to save profile to localStorage', err);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('her_hampers_addresses', JSON.stringify(addresses));
    } catch (err) {
      console.error('Failed to save addresses to localStorage', err);
    }
  }, [addresses]);

  const updateProfile = (updatedFields) => {
    setProfile(prev => {
      const next = { ...prev, ...updatedFields };
      // Also update default address if address fields changed
      if (updatedFields.address || updatedFields.city || updatedFields.state || updatedFields.pincode) {
        setAddresses(prevAddrs => {
          const defaultExists = prevAddrs.some(a => a.isDefault);
          if (defaultExists) {
            return prevAddrs.map(a => a.isDefault ? {
              ...a,
              address: next.address,
              city: next.city,
              state: next.state,
              pincode: next.pincode,
            } : a);
          } else {
            return [
              {
                id: Date.now(),
                tag: 'Home',
                address: next.address,
                city: next.city,
                state: next.state,
                pincode: next.pincode,
                isDefault: true,
              },
              ...prevAddrs
            ];
          }
        });
      }
      return next;
    });
  };

  const addAddress = (newAddr) => {
    const addressObj = {
      id: Date.now(),
      tag: newAddr.tag || 'Other',
      address: newAddr.address,
      city: newAddr.city,
      state: newAddr.state,
      pincode: newAddr.pincode,
      isDefault: addresses.length === 0,
    };
    setAddresses(prev => [addressObj, ...prev]);
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
    const target = addresses.find(a => a.id === id);
    if (target) {
      setProfile(prev => ({
        ...prev,
        address: target.address,
        city: target.city,
        state: target.state,
        pincode: target.pincode
      }));
    }
  };

  return (
    <UserContext.Provider value={{
      profile,
      updateProfile,
      addresses,
      addAddress,
      deleteAddress,
      setDefaultAddress
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
